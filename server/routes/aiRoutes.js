const express = require("express");

const router = express.Router();

const fs = require("fs");

const pdfParse = require("pdf-parse");

const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

require("dotenv").config();

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

router.post(
  "/analyze-resume",
  async (req, res) => {

    try {

      const filePath =
        req.body.path;

      const dataBuffer =
        fs.readFileSync(filePath);

      const pdfData =
        await pdfParse(dataBuffer);

      const model =
        genAI.getGenerativeModel({
          model: "gemini-1.5-flash"
        });

      const prompt = `

Analyze this resume and give:

1. ATS Score out of 100
2. Technical Skills
3. Missing Skills
4. Best Job Roles
5. Improvement Suggestions

Resume:

${pdfData.text}

`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        result.response.text();

      res.json({
        analysis: response
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "AI Error"
      });
    }
  }
);

module.exports = router;