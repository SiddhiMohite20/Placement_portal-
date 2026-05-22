import React, { useState } from "react";
import axios from "axios";

const ResumeAnalyzer = () => {

  const [file, setFile] = useState(null);

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select resume");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const response = await axios.post(
        "https://placement-portal-kqxq.onrender.com/api/ai/analyze-resume",
        formData
      );

      setResult(response.data.analysis);

    } catch (error) {

      console.log(error);

      alert("Resume Analysis Failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#243b55",
          }}
        >
          AI Resume Analyzer
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "gray",
            marginBottom: "30px",
          }}
        >
          Upload your resume and get AI feedback
        </p>

        <div
          style={{
            border: "2px dashed #243b55",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <p
            style={{
              marginTop: "10px",
              color: "#555",
            }}
          >
            {file
              ? file.name
              : "Choose PDF Resume"}
          </p>
        </div>

        <button
          onClick={handleUpload}
          style={{
            width: "100%",
            padding: "15px",
            background: "#243b55",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >

          {loading
            ? "Analyzing..."
            : "Analyze Resume"}

        </button>

        {result && (

          <div
            style={{
              marginTop: "30px",
              background: "#f4f4f4",
              padding: "20px",
              borderRadius: "15px",
            }}
          >

            <h2
              style={{
                color: "#243b55",
                marginBottom: "15px",
              }}
            >
              Analysis Result
            </h2>

            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "15px",
                lineHeight: "1.6",
              }}
            >
              {result}
            </pre>

          </div>
        )}

      </div>

    </div>
  );
};

export default ResumeAnalyzer;