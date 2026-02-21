import { useState } from "react";
import API from "../api/api";

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  const createProject = async () => {
    await API.post("/projects", { title, description });
    alert("Project Created");
  };

  return (
    <div>
      <h2>Create Project</h2>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDesc(e.target.value)}></textarea>
      <button onClick={createProject}>Create</button>
    </div>
  );
}
