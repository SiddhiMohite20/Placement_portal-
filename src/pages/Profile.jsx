import { useState } from "react";
import axios from "axios";

function Profile() {

  const [resume, setResume] =
    useState(null);

  const uploadResume = async () => {

    if (!resume) {

      alert("Please select file");

      return;
    }

    try {

      const formData = new FormData();

      formData.append(
        "resume",
        resume
      );

      const res = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      alert(
        "Resume Uploaded Successfully"
      );

      console.log(res.data);

    } catch (error) {

      console.log(error);

      alert("Upload Failed");
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">

          Upload Resume

        </h1>

        <input
          type="file"
          className="mb-5"
          onChange={(e) =>
            setResume(e.target.files[0])
          }
        />

        <button
          onClick={uploadResume}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg"
        >

          Upload Resume

        </button>

      </div>

    </div>
  );
}

export default Profile;