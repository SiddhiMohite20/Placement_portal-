const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

  email: String,
  company: String,
  role: String,
  location: String,
  resume: String,

  status: {
    type: String,
    default: "Applied"
  }
});

module.exports = mongoose.model(
  "Application",
  applicationSchema
);