// New component: Profile.js
// This is a sample Profile page where users can edit and view their own profile.
// For viewing other users' profiles, you can extend this by passing a 'userId' prop or using URL params.
// I've assumed some state management (e.g., via context or localStorage for simplicity), but in a real app, use Redux, Context API, or fetch from backend.
// Match percentage calculation is added as a utility function at the bottom.

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Mock current user data (replace with actual auth/user context)
const currentUser = {
  id: "current-user-id",
  name: "Your Name",
  skills: ["React", "Node", "JavaScript"],
  projects: [
    { title: "Project 1", description: "Desc 1", link: "link1" },
  ],
  education: "Bachelor's in Computer Science",
  experience: "2 years as Full Stack Developer",
  otherDetails: "Additional info here",
};

// Mock other users data (in real app, fetch from API)
const usersData = {
  "1": {
    name: "Aditi Sharma",
    skills: ["React", "Node"],
    projects: [{ title: "Proj A", description: "Desc A", link: "linkA" }],
    education: "Master's in Software Engineering",
    experience: "3 years",
    otherDetails: "Loves coding",
  },
  "2": {
    name: "Rahul Patil",
    skills: ["Python", "ML"],
    projects: [{ title: "Proj B", description: "Desc B", link: "linkB" }],
    education: "PhD in AI",
    experience: "5 years",
    otherDetails: "ML expert",
  },
  // Add more users...
};

export default function Profile() {
  const { userId } = useParams(); // For /profile/:userId
  const navigate = useNavigate();
  const isOwnProfile = !userId || userId === currentUser.id;

  const [profile, setProfile] = useState(isOwnProfile ? currentUser : usersData[userId] || {});
  const [isEditing, setIsEditing] = useState(false);
  const [matchPercentage, setMatchPercentage] = useState(0);

  useEffect(() => {
    if (!isOwnProfile && userId) {
      // Fetch other user's profile (mocked here)
      const otherProfile = usersData[userId];
      if (otherProfile) {
        setProfile(otherProfile);
        const match = calculateMatchPercentage(currentUser.skills, otherProfile.skills);
        setMatchPercentage(match);
      } else {
        // Handle not found
        navigate("/dashboard");
      }
    }
  }, [userId, navigate]);

  const handleChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...profile.skills];
    newSkills[index] = value;
    setProfile({ ...profile, skills: newSkills });
  };

  const addSkill = () => {
    setProfile({ ...profile, skills: [...profile.skills, ""] });
  };

  const removeSkill = (index) => {
    const newSkills = profile.skills.filter((_, i) => i !== index);
    setProfile({ ...profile, skills: newSkills });
  };

  // Similar handlers for projects (add, remove, edit)

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...profile.projects];
    newProjects[index][field] = value;
    setProfile({ ...profile, projects: newProjects });
  };

  const addProject = () => {
    setProfile({
      ...profile,
      projects: [...profile.projects, { title: "", description: "", link: "" }],
    });
  };

  const removeProject = (index) => {
    const newProjects = profile.projects.filter((_, i) => i !== index);
    setProfile({ ...profile, projects: newProjects });
  };

  const handleSave = () => {
    // Save to backend or localStorage
    console.log("Saved Profile:", profile);
    setIsEditing(false);
  };

  const handleInvite = () => {
    // Logic to send invite request
    console.log(`Invite sent to ${profile.name} with match ${matchPercentage}%`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Assuming Sidebar is imported or globally available */}

      <main className="flex-1 p-6 md:p-10">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {isOwnProfile ? "My Profile" : `${profile.name}'s Profile`}
          </h2>
          {!isOwnProfile && (
            <div className="text-green-600 font-bold">
              Match Score: {matchPercentage}%
              <button
                onClick={handleInvite}
                className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Invite
              </button>
            </div>
          )}
          {isOwnProfile && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          )}
        </header>

        <section className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">Skills</h3>
          {isEditing ? (
            <div className="space-y-2">
              {profile.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded mr-2"
                  />
                  <button onClick={() => removeSkill(index)} className="text-red-500">
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={addSkill} className="text-blue-600">
                + Add Skill
              </button>
            </div>
          ) : (
            <p>{profile.skills?.join(", ") || "No skills added"}</p>
          )}

          <h3 className="text-lg font-bold mt-6 mb-4">Projects</h3>
          {isEditing ? (
            <div className="space-y-4">
              {profile.projects.map((proj, index) => (
                <div key={index} className="border p-4 rounded">
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    value={proj.description}
                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    placeholder="Description"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    value={proj.link}
                    onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                    placeholder="Link"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button onClick={() => removeProject(index)} className="text-red-500">
                    Remove Project
                  </button>
                </div>
              ))}
              <button onClick={addProject} className="text-blue-600">
                + Add Project
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {profile.projects?.map((proj, index) => (
                <div key={index}>
                  <h4 className="font-semibold">{proj.title}</h4>
                  <p>{proj.description}</p>
                  <a href={proj.link} className="text-blue-600">Link</a>
                </div>
              )) || <p>No projects added</p>}
            </div>
          )}

          <h3 className="text-lg font-bold mt-6 mb-4">Education</h3>
          {isEditing ? (
            <input
              type="text"
              value={profile.education}
              onChange={(e) => handleChange(e, "education")}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{profile.education || "No education added"}</p>
          )}

          <h3 className="text-lg font-bold mt-6 mb-4">Experience</h3>
          {isEditing ? (
            <input
              type="text"
              value={profile.experience}
              onChange={(e) => handleChange(e, "experience")}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{profile.experience || "No experience added"}</p>
          )}

          <h3 className="text-lg font-bold mt-6 mb-4">Other Details</h3>
          {isEditing ? (
            <textarea
              value={profile.otherDetails}
              onChange={(e) => handleChange(e, "otherDetails")}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{profile.otherDetails || "No other details"}</p>
          )}

          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save Profile
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

// Utility function for match percentage (simple skill overlap percentage)
function calculateMatchPercentage(userSkills, otherSkills) {
  if (!userSkills.length) return 0;
  const commonSkills = userSkills.filter((skill) => otherSkills.includes(skill));
  return Math.round((commonSkills.length / userSkills.length) * 100);
}