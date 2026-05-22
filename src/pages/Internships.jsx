import { useState } from "react";
import axios from "axios";

function Internships() {

  const internships = [
    {
      company: "TCS",
      role: "Web Development Intern",
      duration: "3 Months",
      stipend: "₹15000"
    },
    {
      company: "Infosys",
      role: "Java Intern",
      duration: "6 Months",
      stipend: "₹20000"
    },
    {
      company: "Wipro",
      role: "React Intern",
      duration: "2 Months",
      stipend: "₹12000"
    }
  ];

  const [
    selectedInternship,
    setSelectedInternship
  ] = useState(null);

  const [resume, setResume] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleApply = (
    internship
  ) => {

    setSelectedInternship(
      internship
    );
  };

  const submitApplication =
    async () => {

    try {

      setLoading(true);

      // Resume Validation
      if (!resume) {

        alert(
          "Please upload resume"
        );

        setLoading(false);

        return;
      }

      // FormData
      const formData =
        new FormData();

      formData.append(
        "resume",
        resume
      );

      // Upload Resume
      const uploadRes =
        await axios.post(
          "http://localhost:5000/upload",
          formData
        );

      // Save Application
      await axios.post(
        "http://localhost:5000/apply",
        {

          email:
            localStorage.getItem(
              "userEmail"
            ),

          company:
            selectedInternship.company,

          role:
            selectedInternship.role,

          location:
            selectedInternship.duration,

          resume:
            uploadRes.data.file,
        }
      );

      alert(
        `Applied for ${selectedInternship.company}`
      );

      // Close Popup
      setSelectedInternship(
        null
      );

      // Clear Resume
      setResume(null);

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert(
        "Application Failed"
      );

      setLoading(false);
    }
  };

  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-8
    ">

      <h1 className="
        text-3xl
        font-bold
        mb-8
        text-green-600
      ">

        Internship Opportunities

      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      ">

        {internships.map(
          (item, index) => (

          <div
            key={index}
            className="
              bg-white
              shadow-lg
              rounded-xl
              p-6
            "
          >

            <h2 className="
              text-2xl
              font-bold
              text-green-600
            ">

              {item.company}

            </h2>

            <p className="mt-2">

              {item.role}

            </p>

            <p>

              Duration:
              {" "}
              {item.duration}

            </p>

            <p>

              Stipend:
              {" "}
              {item.stipend}

            </p>

            <button
              onClick={() =>
                handleApply(item)
              }
              className="
                bg-green-600
                text-white
                px-5
                py-2
                rounded
                mt-4
                hover:bg-green-700
              "
            >

              Apply Internship

            </button>

          </div>
        ))}

      </div>

      {/* APPLY POPUP */}

      {selectedInternship && (

        <div className="
          fixed
          inset-0
          bg-black/50
          flex
          justify-center
          items-center
        ">

          <div className="
            bg-white
            p-8
            rounded-xl
            w-96
            shadow-2xl
          ">

            <h2 className="
              text-2xl
              font-bold
              mb-5
              text-green-600
            ">

              Apply for
              {" "}
              {
                selectedInternship.company
              }

            </h2>

            <input
              type="file"
              className="
                w-full
                border
                p-2
                mb-4
                rounded
              "
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
              className="
                bg-green-600
                text-white
                px-4
                py-2
                rounded
                w-full
                hover:bg-green-700
              "
            >

              {
                loading
                  ? "Applying..."
                  : "Submit Application"
              }

            </button>

            <button
              onClick={() =>
                setSelectedInternship(
                  null
                )
              }
              className="
                mt-3
                bg-gray-300
                px-4
                py-2
                rounded
                w-full
              "
            >

              Cancel

            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Internships;