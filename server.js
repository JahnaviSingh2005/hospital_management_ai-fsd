const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");
const errorHandler = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Hospital Patient Management System API",
    });
});

// Patient routes
app.use("/patients", patientRoutes);

// Global error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
