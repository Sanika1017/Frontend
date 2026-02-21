import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Dashboard() {
  const [recommendedMates] = useState([
    { id: 1, name: "Aditi Sharma", skills: ["React", "Node"], match: 92 },
    { id: 2, name: "Rahul Patil", skills: ["Python", "ML"], match: 88 },
    { id: 3, name: "Neha Deshmukh", skills: ["UI/UX", "Figma"], match: 81 },
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [project, setProject] = useState({
    title: "",
    description: "",
    link: "",
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Project Submitted:", project);
    // Reset form
    setProject({ title: "", description: "", link: "" });
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Welcome to SkillSync 👋</h2>
            <p className="text-gray-500 text-sm">
              Find teammates for your projects easily.
            </p>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 text-white p-6 rounded-xl">
            <p>Total Skills Added</p>
            <h3 className="text-3xl font-bold">8</h3>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl">
            <p>My Projects</p>
            <h3 className="text-3xl font-bold">3</h3>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-xl">
            <p>Team Matches</p>
            <h3 className="text-3xl font-bold">12</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommended Teammates */}
          <section className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4">🔥 Recommended Teammates</h3>
            <div className="space-y-4">
              {recommendedMates.map((mate) => (
                <div
                  key={mate.id}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h4 className="font-semibold">{mate.name}</h4>
                    <p className="text-sm text-gray-500">
                      {mate.skills.join(", ")}
                    </p>
                    <p className="text-xs text-green-600 font-bold">
                      Match Score: {mate.match}%
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    Invite
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Project Post */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4">Post New Project</h3>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Post Project
            </button>
          </section>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">
              <h3 className="text-xl font-bold mb-4">New Project</h3>

              <input
                type="text"
                name="title"
                value={project.title}
                onChange={handleChange}
                placeholder="Project Title"
                className="w-full p-2 border rounded mb-3"
              />

              <textarea
                name="description"
                value={project.description}
                onChange={handleChange}
                placeholder="Project Description"
                className="w-full p-2 border rounded mb-3"
              ></textarea>

              <input
                type="text"
                name="link"
                value={project.link}
                onChange={handleChange}
                placeholder="Project Link"
                className="w-full p-2 border rounded mb-3"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
