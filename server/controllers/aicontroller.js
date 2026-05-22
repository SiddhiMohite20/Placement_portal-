const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");

exports.analyzeResume = async (req, res) => {

  try {

    console.log(req.file);

    const pdfBuffer =
      fs.readFileSync(req.file.path);

    const data =
      await pdfParse(pdfBuffer);

    const resumeText = data.text;

    const prompt = `
Analyze this resume.

Give:
1. Resume Score
2. Missing Skills
3. Suggestions
4. ATS Compatibility

Resume:
${resumeText}
`;

    // OpenRouter API Call
    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },

      {
        headers: {

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json"
        }
      }
    );

    console.log(response.data);

    const result =
      response.data.choices[0]
      .message.content;

    res.json({
      success: true,
      analysis: result
    });

  } catch (error) {

    console.log(
      error.response?.data ||
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Resume Analysis Failed"
    });
  }
};