import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function FindTeammates() {
  const [users] = useState([
    { id: 1, name: "Aditi Sharma", skills: ["React", "Node"], match: 92 },
    { id: 2, name: "Rahul Patil", skills: ["Python", "ML"], match: 88 },
    { id: 3, name: "Neha Deshmukh", skills: ["UI/UX", "Figma"], match: 81 },
    { id: 4, name: "Rohit Jain", skills: ["React", "Python"], match: 75 },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-6">Find Teammates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg"
            >
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">
                Skills: {user.skills.join(", ")}
              </p>
              <p className="text-xs text-green-600 font-bold">
                Match Score: {user.match}%
              </p>
              <button className="mt-2 w-full bg-indigo-600 text-white py-1 rounded hover:bg-indigo-700">
                Invite
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
