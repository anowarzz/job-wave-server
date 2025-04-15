const express = require("express");
const router = express.Router();
const jobApplicationController = require("../controllers/jobApplicationController");

// Create job application
router.post("/", jobApplicationController.createJobApplication);

// Get applications by one user with query parameter for email
router.get("/user", jobApplicationController.getApplicationsByUser);

// Get applications by job
router.get("/job/:jobId", jobApplicationController.getApplicationsByJob);

module.exports = router;
