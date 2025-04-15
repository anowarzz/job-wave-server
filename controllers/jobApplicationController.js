const JobApplicationService = require("../services/jobApplicationServices");
const AppError = require("../utils/appError");
const ErrorTypes = require("../utils/errorTypes");

// Create job application
const createJobApplication = async (req, res) => {
  try {
    const applicationData = req.body;

    // Basic validation
    if (!applicationData.userId || !applicationData.jobId) {
      return res.status(400).send({
        success: false,
        message: "User ID and Job ID are required",
        errorType: ErrorTypes.VALIDATION_ERROR,
      });
    }

    const result = await JobApplicationService.createJobApplication(
      applicationData
    );
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating job application:", error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        success: false,
        message: error.message,
        errorType: error.errorType,
      });
    }

    res.status(500).send({
      success: false,
      message: "Failed to create job application",
      errorType: ErrorTypes.DATABASE_ERROR,
    });
  }
};

// Get applications by user
const getApplicationsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
        errorType: ErrorTypes.VALIDATION_ERROR,
      });
    }

    const applications = await JobApplicationService.getApplicationsByUser(
      userId
    );
    res.send(applications);
  } catch (error) {
    console.error("Error getting applications by user:", error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        success: false,
        message: error.message,
        errorType: error.errorType,
      });
    }

    res.status(500).send({
      success: false,
      message: "Failed to fetch user applications",
      errorType: ErrorTypes.DATABASE_ERROR,
    });
  }
};

// Get applications by job
const getApplicationsByJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    if (!jobId) {
      return res.status(400).send({
        success: false,
        message: "Job ID is required",
        errorType: ErrorTypes.VALIDATION_ERROR,
      });
    }

    const applications = await JobApplicationService.getApplicationsByJob(
      jobId
    );
    res.send(applications);
  } catch (error) {
    console.error("Error getting applications by job:", error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        success: false,
        message: error.message,
        errorType: error.errorType,
      });
    }

    res.status(500).send({
      success: false,
      message: "Failed to fetch job applications",
      errorType: ErrorTypes.DATABASE_ERROR,
    });
  }
};

module.exports = {
  createJobApplication,
  getApplicationsByUser,
  getApplicationsByJob,
};
