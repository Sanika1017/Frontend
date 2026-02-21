import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function MySkills() {
  // Skill categories and skills
  const skillCategories = {
    Software: ["Python", "Java", "C++", "C#", "Go"],
    Designing: ["UI/UX", "Figma", "Adobe XD", "Photoshop"],
    "Full Stack": ["React", "Node.js", "MongoDB", "Express.js"],
    "Web Development": ["HTML", "CSS", "JavaScript", "Tailwind", "Bootstrap"],
  };

  const [category, setCategory] = useState("Software");
  const [availableSkills, setAvailableSkills] = useState(skillCategories[category]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [userSkills, setUserSkills] = useState([
    { name: "React", category: "Full Stack" },
    { name: "Python", category: "Software" },
  ]);

  // Update available skills when category changes
  useEffect(() => {
    setAvailableSkills(skillCategories[category]);
    setSelectedSkill(skillCategories[category][0]);
  }, [category]);

  // Add new skill
  const addSkill = () => {
    if (!userSkills.find((s) => s.name === selectedSkill)) {
      setUserSkills([...userSkills, { name: selectedSkill, category }]);
    }
  };

  // Remove skill
  const removeSkill = (skillName) => {
    setUserSkills(userSkills.filter((s) => s.name !== skillName));
  };

  // Edit skill
  const editSkill = (index, newName) => {
    const updatedSkills = [...userSkills];
    updatedSkills[index].name = newName;
    setUserSkills(updatedSkills);
  };

  // Save skills to backend
  const saveSkills = async () => {
    try {
      const response = await fetch("/api/saveSkills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: userSkills }),
      });

      if (response.ok) {
        alert("Skills saved successfully!");
      } else {
        alert("Failed to save skills");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving skills");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-6">My Skills</h2>

        {/* Add new skill section */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="font-bold mb-3">Add New Skill</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded"
            >
              {Object.keys(skillCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Skill dropdown */}
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="p-2 border rounded"
            >
              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>

            <button
              onClick={addSkill}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Add Skill
            </button>
          </div>
        </div>

        {/* User skills list */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-4">Your Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {userSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-100 p-3 rounded-xl flex flex-col items-center justify-center relative hover:shadow-md"
              >
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => editSkill(index, e.target.value)}
                  className="bg-transparent text-center w-full font-medium focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">{skill.category}</p>
                <button
                  onClick={() => removeSkill(skill.name)}
                  className="absolute top-1 right-1 text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Save button */}
          <div className="mt-6">
            <button
              onClick={saveSkills}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Skills
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
