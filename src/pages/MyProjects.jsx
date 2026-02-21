import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/api";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    project_link: "",
    start_date: "",
    end_date: "",
  });

  // Load projects
  const loadProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Add / Update Project
  const saveProject = async () => {
    if (editId) {
      await API.put(`/projects/${editId}`, form);
    } else {
      await API.post("/projects", form);
    }

    setShowModal(false);
    setEditId(null);
    setForm({ title: "", description: "", project_link: "", start_date: "", end_date: "" });
    loadProjects();
  };

  // Delete
  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    loadProjects();
  };

  // Edit
  const editProject = (proj) => {
    setForm(proj);
    setEditId(proj.id);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">My Projects</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="text-lg font-bold mb-2">{proj.title}</h3>
              <p className="text-gray-500">{proj.description}</p>

              <p className="text-sm mt-2">
                📅 {proj.start_date} → {proj.end_date}
              </p>

              <a
                href={proj.project_link}
                className="text-indigo-600 text-sm"
                target="_blank"
              >
                View Project
              </a>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => editProject(proj)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96">
              <h3 className="text-xl font-bold mb-4">
                {editId ? "Edit Project" : "Add Project"}
              </h3>

              <input
                className="w-full border p-2 mb-2"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <textarea
                className="w-full border p-2 mb-2"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <input
                className="w-full border p-2 mb-2"
                placeholder="Project Link"
                value={form.project_link}
                onChange={(e) => setForm({ ...form, project_link: e.target.value })}
              />

              {/* ✅ Calendar Start Date */}
              <label className="text-sm font-semibold">Start Date</label>
              <input
                type="date"
                className="w-full border p-2 mb-2"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              />

              {/* ✅ Calendar End Date */}
              <label className="text-sm font-semibold">End Date</label>
              <input
                type="date"
                className="w-full border p-2 mb-4"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProject}
                  className="px-3 py-1 bg-indigo-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
