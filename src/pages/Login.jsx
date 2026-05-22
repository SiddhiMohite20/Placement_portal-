import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [form, setForm] =
    useState({

      email: "",
      password: ""
    });

  const navigate =
    useNavigate();

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async () => {

    try {

      const res = await fetch(

        "http://localhost:5000/login",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(form)
        }
      );

      const data =
        await res.json();

      // =====================
      // LOGIN SUCCESS
      // =====================

      if (

        data.message ===
          "Login Success" ||

        data.message ===
          "Admin Login"
      ) {

        localStorage.setItem(

          "userEmail",

          data.email
        );

        localStorage.setItem(

          "userName",

          data.name
        );

        localStorage.setItem(

          "isAdmin",

          data.isAdmin
        );

        // =====================
        // ADMIN REDIRECT
        // =====================

        if (data.isAdmin) {

          navigate("/admin");

        } else {

          navigate("/dashboard");
        }

      } else {

        alert(
          "Invalid Credentials"
        );
      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (

    <div className="
      flex
      justify-center
      items-center
      h-screen
      bg-gray-100
    ">

      <div className="
        bg-white
        p-6
        rounded-xl
        shadow-md
        w-80
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-5
          text-center
          text-blue-600
        ">

          Login

        </h2>

        <input
          name="email"
          placeholder="Email"
          className="
            w-full
            border
            p-2
            mb-3
            rounded
          "
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="
            w-full
            border
            p-2
            mb-4
            rounded
          "
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="
            w-full
            bg-blue-600
            text-white
            py-2
            rounded
            hover:bg-blue-700
          "
        >

          Login

        </button>

        {/* ADMIN LOGIN INFO */}

        <div className="
          mt-5
          text-sm
          text-gray-500
          text-center
        ">

          

        </div>

      </div>

    </div>
  );
}

export default Login;