import { useState } from "react";
import API from "../api/api";

export default function SkillProfile() {
  const [skill, setSkill] = useState("");

  const addSkill = async () => {
    await API.post("/users/skills", { skill });
    alert("Skill Added");
    setSkill("");
  };

  return (
    <div>
      <h3>Add Skill</h3>
      <input value={skill} onChange={(e) => setSkill(e.target.value)} />
      <button onClick={addSkill}>Add</button>
    </div>
  );
}
