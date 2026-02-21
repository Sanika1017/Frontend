import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to DevConnect 🚀
      </h1>

      <p className="text-lg text-indigo-100 mb-8 text-center max-w-xl">
        Connect with teammates, showcase your projects, and build your developer portfolio.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-black/30 border border-white rounded-lg hover:bg-white hover:text-indigo-600 transition"
        >
          Register
        </button>
      </div>

    </div>
  );
}
