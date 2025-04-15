const express = require("express");
const router = express.Router();
const jobApplicationController = require("../controllers/jobApplicationController");

// Create job application
router.post("/", jobApplicationController.createJobApplication);

// Get applications by user
router.get("/user/:userId", jobApplicationController.getApplicationsByUser);

// Get applications by job
router.get("/job/:jobId", jobApplicationController.getApplicationsByJob);

module.exports = router;
