const { ObjectId } = require("mongodb");
const { client } = require("../config/dbConnection");
const AppError = require("../utils/appError");
const ErrorTypes = require("../utils/errorTypes");

const jobCollection = client.db("jobWave").collection("jobs");

// Get all jobs
const getAllJobs = async () => {
  try {
    const cursor = jobCollection.find();
    return await cursor.toArray();
  } catch (error) {
    console.error("Error in getAllJobs service:", error);
    throw new AppError("Failed to fetch jobs", 500, ErrorTypes.DATABASE_ERROR);
  }
};

// Get job by ID
const getJobById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new AppError(
        `Invalid job ID format: ${id}`,
        400,
        ErrorTypes.VALIDATION_ERROR
      );
    }
    const query = { _id: new ObjectId(id) };
    return await jobCollection.findOne(query);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    console.error("Error in getJobById service:", error);
    throw new AppError(
      "Failed to fetch job details",
      500,
      ErrorTypes.DATABASE_ERROR
    );
  }
};

// Create new job
const createJob = async (jobData) => {
  try {
    return await jobCollection.insertOne(jobData);
  } catch (error) {
    console.error("Error in createJob service:", error);
    throw new AppError("Failed to create job", 500, ErrorTypes.DATABASE_ERROR);
  }
};

// Additional functions can be added as needed for updating and deleting jobs

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
};
