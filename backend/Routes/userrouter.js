const express = require("express");
const { BlockModel } = require("../Models/blockUser");
const { authenticator } = require("../Middleware/authenticator");
const { checkRole } = require("../Middleware/authorization");
const { getAllUsers, deleteUserById, userLogin, registerNewUser, updateUserById } = require("../controllers/userController");

const userRouter = express.Router();

// Get all users (requires authentication and admin/superadmin role)
userRouter.get("/all",authenticator,checkRole(["admin", "superadmin"]), getAllUsers);

// Delete a user by ID (requires authentication and admin/superadmin role)
userRouter.delete("/delete/:id", authenticator, checkRole(["admin", "superadmin"]), deleteUserById);

// Update a user by ID (requires authentication and admin/superadmin role)
userRouter.patch("/update/:id", authenticator, checkRole(["admin", "superadmin"]), updateUserById);

// Register a new user
userRouter.post("/register", registerNewUser);

// Login route
userRouter.post("/login", userLogin);

// Logout route
userRouter.get("/logout", async (req, res) => {
    try {
        let token = req.headers.authorization;
        // await client.HDEL("tokensObj", token);
        // Create a block entry for the revoked token
        let block = new BlockModel({ token });
        await block.save();
        res.send({ "mess": "Logout Successful" });
    } catch (error) {
        res.send({ "Error": error.message });
    }
});

module.exports = { userRouter };
