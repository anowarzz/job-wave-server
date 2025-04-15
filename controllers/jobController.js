const JobService = require("../services/jobServices");
const AppError = require("../utils/appError");
const ErrorTypes = require("../utils/errorTypes");

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobService.getAllJobs();
    res.send(jobs);
  } catch (error) {
    console.error("Error getting all jobs:", error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch jobs",
      errorType: ErrorTypes.DATABASE_ERROR,
    });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await JobService.getJobById(id);

    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
        errorType: ErrorTypes.NOT_FOUND_ERROR,
      });
    }

    res.send(job);
  } catch (error) {
    console.error("Error getting job by ID:", error);

    // Check if it's an AppError instance
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        success: false,
        message: error.message,
        errorType: error.errorType,
      });
    }

    res.status(500).send({
      success: false,
      message: "Failed to fetch job details",
      errorType: ErrorTypes.DATABASE_ERROR,
    });
  }
};

// Create new job
const createJob = async (req, res) => {
  try {
    const jobData = req.body;

    // Basic validation
    if (!jobData.title || !jobData.company) {
      return res.status(400).send({
        success: false,
        message: "Job title and company are required",
        errorType: ErrorTypes.VALIDATION_ERROR,
      });
    }

    const result = await JobService.createJob(jobData);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating job:", error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        success: false,
        message: error.message,
        errorType: error.errorType,
      });
    }

    res.status(500).send({
      success: false,
      message: "Failed to create job",
      errorType: ErrorTypes.DATABASE_ERROR,
    });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
};
