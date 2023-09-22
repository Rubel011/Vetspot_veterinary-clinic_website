const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/userrouter");
const { doctorRouter } = require("./Routes/DoctorRouter");
const { AppointmentRouter } = require("./Routes/AppointmentRouter");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const { timeSlot } = require("./Routes/bookingRoute");
const { successResponse } = require("./helpers/successAndErrorResponse");
const specs = require("./config/swaggerConfig");

// Middleware
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs)); // Swagger documentation endpoint

// Root route for checking server status
app.get("/", (req, res) => {
    res.status(200).json(successResponse(200, "Server is running successfully", null));
});

// User routes
app.use("/user", userRouter);

// Doctor routes
app.use("/doctor", doctorRouter);

// Time slot routes
app.use("/", timeSlot);

// Appointment routes
app.use("/appointment", AppointmentRouter);

// Start the server
app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to the database");
    } catch (error) {
        console.log("Error while connecting to the database");
    }
    console.log("Server Running on port " + process.env.PORT);
});
