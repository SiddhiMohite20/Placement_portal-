import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    const res = await fetch(
      "http://localhost:5000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    const data = await res.json();

    if (data.message === "Login Success") {

      localStorage.setItem(
        "userEmail",
        data.email
      );

      localStorage.setItem(
        "userName",
        data.name
      );

      navigate("/dashboard");

    } else {

      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow-md w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;