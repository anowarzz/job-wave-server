const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// Get all jobs
router.get("/", jobController.getAllJobs);

// Get job by ID
router.get("/:id", jobController.getJobById);

// Create new job
router.post("/", jobController.createJob);

module.exports = router;
