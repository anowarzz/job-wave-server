const { client } = require("../config/dbConnection");
const AppError = require("../utils/appError");
const ErrorTypes = require("../utils/errorTypes");

const jobApplicationCollection = client
  .db("jobWave")
  .collection("jobApplications");

// Create job application
const createJobApplication = async (applicationData) => {
  try {
    return await jobApplicationCollection.insertOne(applicationData);
  } catch (error) {
    console.error("Error in createJobApplication service:", error);
    throw new AppError(
      "Failed to create job application",
      500,
      ErrorTypes.DATABASE_ERROR
    );
  }
};

// Get applications by user
const getApplicationsByUser = async (userId) => {
  try {
    if (!userId) {
      throw new AppError(
        "User ID is required",
        400,
        ErrorTypes.VALIDATION_ERROR
      );
    }

    const query = { userId: userId };
    const cursor = jobApplicationCollection.find(query);
    return await cursor.toArray();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    console.error("Error in getApplicationsByUser service:", error);
    throw new AppError(
      "Failed to fetch user applications",
      500,
      ErrorTypes.DATABASE_ERROR
    );
  }
};

// Get applications by job
const getApplicationsByJob = async (jobId) => {
  try {
    if (!jobId) {
      throw new AppError(
        "Job ID is required",
        400,
        ErrorTypes.VALIDATION_ERROR
      );
    }

    const query = { jobId: jobId };
    const cursor = jobApplicationCollection.find(query);
    return await cursor.toArray();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    console.error("Error in getApplicationsByJob service:", error);
    throw new AppError(
      "Failed to fetch job applications",
      500,
      ErrorTypes.DATABASE_ERROR
    );
  }
};

module.exports = {
  createJobApplication,
  getApplicationsByUser,
  getApplicationsByJob,
};
