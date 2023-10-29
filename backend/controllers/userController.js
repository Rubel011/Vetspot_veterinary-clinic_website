const { UserModel } = require("../Models/UserModel");
const { sendEmail } = require("../helpers/sendEmail");
const bcrypt = require("bcrypt"); 
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const { successResponse, errorResponse } = require("../helpers/successAndErrorResponse");

const FRONTEND_DEPLOYED_URL = process.env.FRONTEND_DEPLOYED_URL || "http://localhost:8080";
const JWT_SECRET = process.env.JWT_SECRET || "masai-secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "masai-refresh-secret";

// Get all users from the database
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(successResponse(200, "Successfully retrieved all users", users));
    } catch (error) {
        res.status(500).json(errorResponse(500, "Failed to retrieve users", error.message));
    }
}

// Delete a user by their ID
module.exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json(errorResponse(404, "User not found"));
        }
        res.status(200).json(successResponse(200, "User deleted successfully", deletedUser));
    } catch (error) {
        res.status(500).json(errorResponse(500, "Failed to delete user", error.message));
    }
}

// Update a user by their ID
module.exports.updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedUser) {
            return res.status(404).json(errorResponse(404, "User not found"));
        }
        res.status(200).json(successResponse(200, "User updated successfully", updatedUser));
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
}

// Register a new user
module.exports.registerNewUser = async (req, res) => {
    const { password, email, name } = req.body;
    try {
        // Check if the user already exists
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(400).json(errorResponse(400, "User already exists"));
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json(errorResponse(500, "Error in hashing password"));
        }

        // Create a new user document with hashed password
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Send a welcome email to the user
        const emailData = {
            email: newUser.email,
            subject: "Welcome to Vetspot!",
            body: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <h2>Welcome to Vetspot ${name}!</h2>
            <p>Thank you for registering with Vetspot.</p>
            <p>Vetspot is a veterinary clinic website.</p>
            <p>Happy Exploring!</p>
            <p>Best regards,</p>
            <p>The Vetspot Team</p>
            <a href="${FRONTEND_DEPLOYED_URL}/login">Proceed to Login</a>
          </body>
        </html>
      `,
        };
        sendEmail(emailData);

        res.status(201).json(successResponse(201, "User successfully registered", newUser));
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json(errorResponse(500, "Failed to register user"));
    }
}


module.exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json(errorResponse(401, 'Invalid credentials'));
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json(errorResponse(401, 'Invalid credentials'));
        }

        // If the credentials are valid, generate an access token
        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Generate a refresh token
        const refreshToken = jwt.sign(
            { userId: user._id, email: user.email },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' } // Refresh token expires in 7 days, adjust as needed
        );

        let successData = successResponse(200, 'Login successful', user)
        successData.accessToken = accessToken;
        successData.refreshToken = refreshToken;

        // setting cookies
        res.cookie("accessToken", accessToken)
        res.cookie("refreshToken", refreshToken)
        // For simplicity, we'll just send it in the response here
        res.status(200).json(successData);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json(errorResponse(500, error.message));
    }
}