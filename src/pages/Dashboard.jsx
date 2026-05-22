import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [applications, setApplications] =
    useState([]);

  const name =
    localStorage.getItem("userName");

  const email =
    localStorage.getItem("userEmail");

  useEffect(() => {

    axios
      .get(
        `https://placement-portal-kqxq.onrender.com/dashboard/${email}`
      )
      .then((res) => {
        setApplications(res.data);
      });

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">

        Welcome, {name} 👋

      </h1>

      {/* TOTAL APPLIED */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8 w-72">

        <h2 className="text-gray-500">
          Applied Jobs
        </h2>

        <p className="text-3xl font-bold text-blue-600 mt-2">
          {applications.length}
        </p>

      </div>

      {/* APPLIED COMPANIES */}
      <h2 className="text-2xl font-bold mb-4">

        Applied Companies

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {applications.map((app, index) => (

          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow"
          >

            <h3 className="text-xl font-bold text-blue-600">

              {app.company}

            </h3>

            <p className="mt-2">

              {app.role}

            </p>

            <p className="text-gray-500">

              {app.location}

            </p>

            <p className="text-sm text-gray-400 mt-2">

              Resume: {app.resume}

            </p>

            {/* STATUS */}

            <p
              className={`mt-3 font-bold ${
                app.status === "Selected"
                  ? "text-green-600"
                  : app.status === "Rejected"
                  ? "text-red-600"
                  : app.status === "Shortlisted"
                  ? "text-yellow-600"
                  : "text-blue-600"
              }`}
            >

              Status: {app.status}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;