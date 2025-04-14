const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v1rp4a3.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Jobs Collection
    const jobCollection = client.db("jobWave").collection("jobs");
    //Job application collection
    const jobApplicationCollection = client
      .db("jobWave")
      .collection("jobApplications");

    // All jobs api
    app.get("/jobs", async (req, res) => {
      try {
        const cursor = jobCollection.find();
        const jobs = await cursor.toArray();
        res.send(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).send("Error fetching jobs");
      }
    });

    // Single Job Details api
    app.get("/jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const job = await jobCollection.findOne(query);
        res.send(job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        res.status(500).send("Error fetching job details");
      }
    }); // Added missing closing bracket here

    // Job applications api
    app.post("/job-applications", async (req, res) => {
      try {
        const application = req.body;
        console.log(application);
        
        const result = await jobApplicationCollection.insertOne(application);
        console.log(result);
        
        res.send(result);
      } catch (error) {
        console.error("Error processing job application:", error);
        res.status(500).send("Error processing job application");
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Testing Main Route
app.get("/", (req, res) => {
  res.send("Job is Falling From the Sky!");
});

// Listening to the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
