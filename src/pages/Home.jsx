import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">

        {/* HERO SECTION */}
        <div className="flex flex-col items-center justify-center text-center pt-32 px-6">

          <h1 className="text-6xl font-extrabold text-gray-800 leading-tight">
            Build Your
            <span className="text-blue-600"> Dream Career</span> 🚀
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-2xl">
            Discover internships, placements, and opportunities
            designed for students to grow and succeed.
          </p>

          <div className="flex gap-4 mt-8">

            <a
              href="/jobs"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg transition"
            >
              Explore Jobs
            </a>

            <a
              href="/register"
              className="bg-white hover:bg-gray-100 border px-8 py-4 rounded-2xl shadow-lg transition"
            >
              Get Started
            </a>

          </div>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-8 px-10 mt-24 pb-20">

          <div className="bg-white rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">
            <div className="text-5xl mb-4">💼</div>

            <h2 className="text-2xl font-bold mb-3">
              Top Companies
            </h2>

            <p className="text-gray-600">
              Apply to internships and jobs from leading companies.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">
            <div className="text-5xl mb-4">📈</div>

            <h2 className="text-2xl font-bold mb-3">
              Track Applications
            </h2>

            <p className="text-gray-600">
              Monitor shortlisted, rejected, and applied jobs easily.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">
            <div className="text-5xl mb-4">🚀</div>

            <h2 className="text-2xl font-bold mb-3">
              Career Growth
            </h2>

            <p className="text-gray-600">
              Start building your future with the right opportunities.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Home;