import { useState } from "react";
import axios from "axios";

function Jobs() {

  const jobs = [
    {
      company: "Google",
      role: "Frontend Developer",
      location: "Pune"
    },
    {
      company: "Infosys",
      role: "Backend Developer",
      location: "Mumbai"
    },
    {
      company: "TCS",
      role: "Java Developer",
      location: "Nashik"
    }
  ];

  const [selectedJob, setSelectedJob] =
    useState(null);

  const [resume, setResume] =
    useState(null);

  const handleApply = (job) => {

    setSelectedJob(job);
  };

  const submitApplication = async () => {

    try {

      // ✅ RESUME VALIDATION
      if (!resume) {

        alert("Please upload resume");

        return;
      }

      // ✅ FILE DATA
      const formData = new FormData();

      formData.append(
        "resume",
        resume
      );

      // ✅ UPLOAD RESUME
      const uploadRes =
        await axios.post(
          "http://localhost:5000/upload",
          formData
        );

      // ✅ SAVE APPLICATION
      await axios.post(
        "http://localhost:5000/apply",
        {

          email:
            localStorage.getItem(
              "userEmail"
            ),

          company:
            selectedJob.company,

          role:
            selectedJob.role,

          location:
            selectedJob.location,

          resume:
            uploadRes.data.file,
        }
      );

      alert(
        `Applied for ${selectedJob.company}`
      );

      // CLOSE POPUP
      setSelectedJob(null);

      // CLEAR RESUME
      setResume(null);

    } catch (error) {

      console.log(error);

      alert("Application Failed");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8 text-blue-600">

        Available Jobs

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {jobs.map((job, index) => (

          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6"
          >

            <h2 className="text-2xl font-bold text-blue-600">

              {job.company}

            </h2>

            <p className="mt-2">

              {job.role}

            </p>

            <p>

              {job.location}

            </p>

            <button
              onClick={() =>
                handleApply(job)
              }
              className="bg-blue-600 text-white px-5 py-2 rounded mt-4 hover:bg-blue-700"
            >

              Apply Now

            </button>

          </div>

        ))}

      </div>

      {/* APPLY POPUP */}
      {selectedJob && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-8 rounded-xl w-96 shadow-2xl">

            <h2 className="text-2xl font-bold mb-5 text-blue-600">

              Apply for {selectedJob.company}

            </h2>

            <input
              type="file"
              className="w-full border p-2 mb-4 rounded"
              onChange={(e) =>
                setResume(
                  e.target.files[0]
                )
              }
            />

            <button
              onClick={
                submitApplication
              }
              className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
            >

              Submit Application

            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Jobs;