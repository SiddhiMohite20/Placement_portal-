import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Internships from "./pages/Internships";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Chatbot from "./pages/Chatbot";

function ProtectedRoute({ children }) {

  const user = localStorage.getItem("userEmail");

  return user
    ? children
    : <Navigate to="/login" />;
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* JOBS */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        {/* INTERNSHIPS */}
        <Route
          path="/internships"
          element={
            <ProtectedRoute>
              <Internships />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin"
  element={<Admin />}
/>


<Route
  path="/ResumeAnalyzer"
  element={<ResumeAnalyzer />}
/>
<Route
  path="/chatbot"
  element={<Chatbot />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;