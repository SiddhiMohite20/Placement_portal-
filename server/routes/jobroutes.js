const express = require("express");
const router = express.Router();

const Job = require("../models/job");
const Application = require("../models/application");


// GET ALL JOBS
router.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});


// APPLY JOB
router.post("/apply", async (req, res) => {
  const { email, jobId } = req.body;

  const already = await Application.findOne({ email, jobId });

  if (already) {
    return res.json({ message: "Already Applied" });
  }

  await Application.create({ email, jobId });

  res.json({ message: "Applied Successfully" });
});

module.exports = router;