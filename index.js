require("dotenv").config();
const express = require("express");
const app = express();
const { connection } = require(".//Config/db");
const cors = require("cors");
const { jobModel } = require("./Models/job.model");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Masai_Job_app...");
});

// ----------------posting job api------------
app.post("/postjob", async (req, res) => {
  const { company, city, location, role, level, contract, position, language } =
    req.body;

  console.log(req.body, "jobpost.... ");
  const job_post = new jobModel({
    company,
    city,
    location,
    role,
    level,
    contract,
    position,
    language,
  });
  await job_post.save();
  res.send({ msg: "job_post save" });
});

// -------fetching job api-----

app.get("/jobs", async (req, res) => {
  const { user_id } = req.body;

  const alljobs = await jobModel.find();
  console.log(alljobs);
  res.send({ alljobs });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("database connected");
    console.log("listening on PORT : " + process.env.PORT);
  } catch (err) {
    console.log("Databse Connection failed");
    console.log(err);
  }
});
