const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  analyzeResume,
} = require("../controllers/aicontroller");

router.post(
  "/analyze-resume",
  upload.single("resume"),
  analyzeResume
);

module.exports = router;