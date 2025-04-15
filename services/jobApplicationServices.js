const { client } = require("../config/dbConnection");
const JobService = require("../services/jobServices");

const jobApplicationCollection = client
  .db("jobWave")
  .collection("jobApplications");

// Helper function to create custom errors
const createError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Create job application
const createJobApplication = async (applicationData) => {
  try {
    // Add timestamp fields
    const timestampedData = {
      ...applicationData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const jobApplication = await jobApplicationCollection.insertOne(
      timestampedData
    );
    return jobApplication;
  } catch (error) {
    console.error("Error in createJobApplication service:", error);
    throw createError("Failed to create job application");
  }
};

// Get applications by user email
const getApplicationsByUser = async (applicantEmail, options = {}) => {
  // Validate applicantEmail directly
  if (!applicantEmail) {
    throw createError("Applicant Email is required", 400);
  }

  try {
    const query = { applicant_email: applicantEmail };
    const cursor = jobApplicationCollection.find(query);
    const jobApplicationsByUser = await cursor.toArray();

    // Combine each application with job details
    const jobDetailsPromises = jobApplicationsByUser.map(
      async (application) => {
        const jobId = application.job_id;
        const jobDetails = await JobService.getJobById(jobId);

        return {
          ...application,
          jobDetails,
        };
      }
    );
    // returning the applications with job details
    const applicationsWithJobDetails = await Promise.all(jobDetailsPromises);
    return applicationsWithJobDetails;
  } catch (error) {
    console.error("Error in getApplicationsByUser service:", error);
    throw createError("Failed to fetch user applications");
  }
};

// Get applications by job
const getApplicationsByJob = async (jobId) => {
  // Validate jobId directly
  if (!jobId) {
    throw createError("Job ID is required", 400);
  }

  try {
    const query = { job_id: jobId };
    const cursor = jobApplicationCollection.find(query);
    const applicationsByJob = await cursor.toArray();
    return applicationsByJob;
  } catch (error) {
    console.error("Error in getApplicationsByJob service:", error);
    throw createError("Failed to fetch job applications");
  }
};

module.exports = {
  createJobApplication,
  getApplicationsByUser,
  getApplicationsByJob,
};
