const jwt = require("jsonwebtoken");
const { client } = require("../config/redisDB");
const { BlockModel } = require("../Models/blockUser");
const { UserModel } = require("../Models/UserModel");
const { errorResponse } = require("../helpers/successAndErrorResponse");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "masai-secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "masai-refresh-secret";

// Middleware for authenticating user requests using JWT
const authenticator = async (req, res, next) => {
    const token = req.headers.authorization;

    // Check if the token is blacklisted (revoked)
    const isBlacklist = await BlockModel.findOne({ token });

    if (!isBlacklist) {
        // Verify the JWT token
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401).json(errorResponse(401, "Unauthorized - Please login first"));
            } else {
                // Retrieve user data based on the decoded token
                const userData = await UserModel.findById(decoded.userId);

                if (!userData) {
                    res.status(404).json(errorResponse(404, "User not found"));
                } else {
                    // Attach user data to the request object for later use
                    req.user = userData;
                    req.body.userId = decoded.userId;
                    next();
                }
            }
        });
    } else {
        // Token is blacklisted (revoked)
        res.status(401).json(errorResponse(401, "Unauthorized - Please login first"));
    }
};

module.exports = { authenticator };
