export default function ProjectCard({ project }) {
  return (
    <div style={{ border: "1px solid gray", padding: 10 }}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}
