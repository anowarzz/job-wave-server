const { client } = require("../config/dbConnection");

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
    const jobApplication = await jobApplicationCollection.insertOne(
      applicationData
    );
    return jobApplication;
  } catch (error) {
    console.error("Error in createJobApplication service:", error);
    throw createError("Failed to create job application");
  }
};

// Get applications by user
const getApplicationsByUser = async (userId) => {
  // Validate userId directly
  if (!userId) {
    throw createError("User ID is required", 400);
  }

  try {
    const query = { userId: userId };
    const cursor = jobApplicationCollection.find(query);
    const jobApplicationsByUser = await cursor.toArray();
    return jobApplicationsByUser;
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
    const query = { jobId: jobId };
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
