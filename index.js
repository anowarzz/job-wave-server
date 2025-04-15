const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/dbConnection");
const jobRoutes = require("./routes/jobRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");

const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/jobs", jobRoutes);
app.use("/job-applications", jobApplicationRoutes);

// Testing Main Route
app.get("/", (req, res) => {
  res.send("Job is Falling From the Sky!");
});

// 404 handler for undefined routes - using specific path instead of wildcard
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`,
    errorType: "NotFound",
  });
});

// Connect to DB and Start Server
async function startServer() {
  try {
    await connectDB();

    // Listening to the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
