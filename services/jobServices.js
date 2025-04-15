const { ObjectId } = require("mongodb");
const { client } = require("../config/dbConnection");

const jobCollection = client.db("jobWave").collection("jobs");

// Helper function to create custom errors
const createError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Get all jobs
const getAllJobs = async () => {
  try {
    const cursor = jobCollection.find();
    return await cursor.toArray();
  } catch (error) {
    console.error("Error in getAllJobs service:", error);
    throw createError("Failed to fetch jobs");
  }
};

// Get job by ID
const getJobById = async (id) => {
  // Validate ID format without a try-catch
  if (!ObjectId.isValid(id)) {
    throw createError(`Invalid job ID format: ${id}`, 400);
  }

  try {
    const query = { _id: new ObjectId(id) };
    return await jobCollection.findOne(query);
  } catch (error) {
    console.error("Error in getJobById service:", error);
    throw createError("Failed to fetch job details");
  }
};

// Create new job
const createJob = async (jobData) => {
  try {
    return await jobCollection.insertOne(jobData);
  } catch (error) {
    console.error("Error in createJob service:", error);
    throw createError("Failed to create job");
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
};
