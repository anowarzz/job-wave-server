const JobService = require("../services/jobServices");

// Simple response handler function
const sendErrorResponse = (res, error) => {
  console.error(error);
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({
    success: false,
    message: error.message || "An unexpected error occurred",
  });
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobService.getAllJobs();
    res.send(jobs);
  } catch (error) {
    sendErrorResponse(res, error);
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
      });
    }

    res.send(job);
  } catch (error) {
    sendErrorResponse(res, error);
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
      });
    }

    const result = await JobService.createJob(jobData);
    res.status(201).send(result);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
};
