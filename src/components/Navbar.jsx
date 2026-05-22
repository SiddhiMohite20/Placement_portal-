import { Link, useNavigate }
from "react-router-dom";

function Navbar() {

  const navigate =
    useNavigate();

  const name =
    localStorage.getItem(
      "userName"
    );

  const isAdmin =
    localStorage.getItem(
      "isAdmin"
    );

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <nav className="
      backdrop-blur-md
      bg-white/70
      shadow-md
      sticky
      top-0
      z-50
      px-8
      py-4
      flex
      justify-between
      items-center
    ">

      {/* LOGO */}

      <h1 className="
        text-3xl
        font-extrabold
        text-blue-600
        tracking-wide
      ">

        CampusHire

      </h1>

      {/* NAV LINKS */}

      <div className="
        flex
        items-center
        gap-6
        text-gray-700
        font-medium
      ">

        <Link
          to="/"
          className="
            hover:text-blue-600
            transition
            duration-300
          "
        >
          Home
        </Link>

        <Link
          to="/jobs"
          className="
            hover:text-blue-600
            transition
            duration-300
          "
        >
          Jobs
        </Link>

        <Link
          to="/internships"
          className="
            hover:text-blue-600
            transition
            duration-300
          "
        >
          Internships
        </Link>

        <Link
          to="/dashboard"
          className="
            hover:text-blue-600
            transition
            duration-300
          "
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className="
            hover:text-blue-600
            transition
            duration-300
          "
        >
          Resume
        </Link>

        <Link
          to="/chatbot"
          className="
            hover:text-blue-600
            transition
            duration-300
          "
        >
          AI Chatbot
        </Link>

        {/* ADMIN LINK */}

        {isAdmin === "true" && (

          <Link
            to="/admin"
            className="
              hover:text-blue-600
              transition
              duration-300
            "
          >

            Admin

          </Link>
        )}

        {name ? (

          <>

            <span className="
              text-blue-600
              font-semibold
            ">

              Hi, {name} 👋

            </span>

            <button
              onClick={handleLogout}
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-4
                py-2
                rounded-xl
                shadow
                transition
                duration-300
              "
            >

              Logout

            </button>

          </>

        ) : (

          <>

            <Link
              to="/login"
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2
                rounded-xl
                shadow
                transition
                duration-300
              "
            >

              Login

            </Link>

            <Link
              to="/register"
              className="
                border
                border-blue-600
                text-blue-600
                hover:bg-blue-50
                px-5
                py-2
                rounded-xl
                transition
                duration-300
              "
            >

              Register

            </Link>

          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;