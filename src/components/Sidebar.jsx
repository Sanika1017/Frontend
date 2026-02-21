import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-indigo-900 text-white p-6">
      <h1
        className="text-2xl font-bold mb-10 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        SkillSync
      </h1>

      <nav className="space-y-3 flex-1">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-left bg-indigo-800 p-3 rounded-lg block hover:bg-indigo-700"
        >
          🏠 Dashboard
        </button>

        <button
          onClick={() => navigate("/skills")}
          className="w-full text-left hover:bg-indigo-800 p-3 rounded-lg block"
        >
          👩‍💻 My Skills
        </button>

       
<button
  onClick={() => navigate("/profile")}
  className="w-full text-left hover:bg-indigo-800 p-3 rounded-lg block"
>
  👤 My Profile
</button>

        <button
          onClick={() => navigate("/projects")}
          className="w-full text-left hover:bg-indigo-800 p-3 rounded-lg block"
        >
          📌 My Projects
        </button>

        <button
          onClick={() => navigate("/find-teammates")}
          className="w-full text-left hover:bg-indigo-800 p-3 rounded-lg block"
        >
          🔍 Find Teammates
        </button>

        <button
          onClick={() => navigate("/messages")}
          className="w-full text-left hover:bg-indigo-800 p-3 rounded-lg block"
        >
          💬 Messages
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-6 text-red-300 hover:text-white w-full text-left"
      >
        🚪 Logout
      </button>
    </aside>
  );
}
