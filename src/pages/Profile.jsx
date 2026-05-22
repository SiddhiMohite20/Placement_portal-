import { useState } from "react";
import axios from "axios";

function Profile() {

  const [resume, setResume] =
    useState(null);

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const uploadResume = async () => {

    if (!resume) {

      alert("Please select file");

      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "resume",
        resume
      );

      const res = await axios.post(
        "https://placement-portal-kqxq.onrender.com/api/ai/analyze-resume",
        formData
      );

      console.log(res.data);

      setResult(res.data.analysis);

      alert(
        "Resume Analyzed Successfully"
      );

    } catch (error) {

      console.log(error);

      alert("Resume Analysis Failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
      bg-gradient-to-r
      from-blue-900
      to-slate-800
      p-5
    "
    >

      <div
        className="
        bg-white
        p-8
        rounded-3xl
        shadow-2xl
        w-full
        max-w-2xl
      "
      >

        <h1
          className="
          text-4xl
          font-bold
          text-center
          text-blue-700
          mb-3
        "
        >

          AI Resume Analyzer

        </h1>

        <p
          className="
          text-center
          text-gray-500
          mb-8
        "
        >

          Upload your resume and get AI feedback

        </p>

        <div
          className="
          border-2
          border-dashed
          border-blue-400
          rounded-2xl
          p-10
          text-center
          mb-6
        "
        >

          <input
            type="file"
            onChange={(e) =>
              setResume(
                e.target.files[0]
              )
            }
            className="mb-4"
          />

          <p className="text-gray-600">

            {resume
              ? resume.name
              : "Choose Resume PDF"}

          </p>

        </div>

        <button
          onClick={uploadResume}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          w-full
          py-4
          rounded-xl
          text-lg
          font-semibold
          transition-all
        "
        >

          {loading
            ? "Analyzing..."
            : "Analyze Resume"}

        </button>

        {result && (

          <div
            className="
            mt-8
            bg-gray-100
            p-6
            rounded-2xl
          "
          >

            <h2
              className="
              text-2xl
              font-bold
              text-blue-700
              mb-4
            "
            >

              AI Analysis Result

            </h2>

            <pre
              className="
              whitespace-pre-wrap
              text-gray-700
              leading-7
            "
            >

              {result}

            </pre>

          </div>
        )}

      </div>

    </div>
  );
}

export default Profile;