import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const [applications, setApplications] =
    useState([]);

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/all-applications"
      );

      setApplications(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/update-status/${id}`,
        { status }
      );

      // Update UI without reload
      setApplications((prev) =>
        prev.map((app) =>

          app._id === id
            ? { ...app, status }
            : app
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-700 mb-8">

        Admin Dashboard

      </h1>

      <div className="grid gap-6">

        {applications.map((app) => (

          <div
            key={app._id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold text-blue-600">

              {app.company}

            </h2>

            <p className="mt-2">
              <span className="font-semibold">
                Role:
              </span>{" "}
              {app.role}
            </p>

            <p>
              <span className="font-semibold">
                Email:
              </span>{" "}
              {app.email}
            </p>

            <p>
              <span className="font-semibold">
                Status:
              </span>{" "}
              {app.status || "Applied"}
            </p>

            <select
              value={app.status || "Applied"}
              onChange={(e) =>
                updateStatus(
                  app._id,
                  e.target.value
                )
              }
              className="
                border
                p-2
                rounded-lg
                mt-4
                outline-none
              "
            >

              <option>
                Applied
              </option>

              <option>
                Shortlisted
              </option>

              <option>
                Rejected
              </option>

              <option>
                Selected
              </option>

            </select>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Admin;