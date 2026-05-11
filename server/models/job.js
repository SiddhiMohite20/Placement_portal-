const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
});

module.exports =
  mongoose.models.Job ||
  mongoose.model("Job", jobSchema);