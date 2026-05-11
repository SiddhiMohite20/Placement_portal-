import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const [applications, setApplications] =
    useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/all-applications")
      .then((res) => {
        setApplications(res.data);
      });

  }, []);

  const updateStatus = async (id, status) => {

    await axios.put(
      `http://localhost:5000/update-status/${id}`,
      { status }
    );
 window.location.reload();
  };

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Admin Panel
      </h1>

      <div className="grid gap-4">

        {applications.map((app) => (

          <div
            key={app._id}
            className="bg-white p-5 rounded-xl shadow"
          >

            <h2 className="text-xl font-bold text-blue-600">
              {app.company}
            </h2>

            <p>{app.role}</p>

            <p>{app.email}</p>
<select
              className="border p-2 mt-3"
              onChange={(e) =>
                updateStatus(
                  app._id,
                  e.target.value
                )
              }
            >
              <option>Applied</option>
              <option>Shortlisted</option>
              <option>Rejected</option>
              <option>Selected</option>
            </select>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Admin;