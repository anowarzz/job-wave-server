const JobApplicationService = require("../services/jobApplicationServices");

// Simple response handler function
const sendErrorResponse = (res, error) => {
  console.error(error);
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({
    success: false,
    message: error.message || "An unexpected error occurred",
  });
};

// Create job application
const createJobApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    console.log(applicationData);

    // Basic validation
    if (!applicationData.job_id || !applicationData.applicant_email) {
      return res.status(400).send({
        success: false,
        message: "Job ID and Applicant Email are required",
      });
    }

    const result = await JobApplicationService.createJobApplication(
      applicationData
    );
    res.status(201).send(result);
  } catch (error) {
    sendErrorResponse(res, error);
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
      });
    }

    const applications = await JobApplicationService.getApplicationsByUser(
      userId
    );
    res.send(applications);
  } catch (error) {
    sendErrorResponse(res, error);
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
      });
    }

    const applications = await JobApplicationService.getApplicationsByJob(
      jobId
    );
    res.send(applications);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  createJobApplication,
  getApplicationsByUser,
  getApplicationsByJob,
};
