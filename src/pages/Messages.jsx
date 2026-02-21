import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Messages() {
  const [messages] = useState([
    { id: 1, from: "Aditi Sharma", text: "Hey! Interested in joining your project." },
    { id: 2, from: "Rahul Patil", text: "Can we collaborate on ML project?" },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-6">Messages</h2>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md"
            >
              <h4 className="font-semibold">{msg.from}</h4>
              <p className="text-gray-500">{msg.text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
