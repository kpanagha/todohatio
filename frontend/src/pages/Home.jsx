import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Home.css";
import Header from "../components/header/header";


function Home() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const navigate = useNavigate();

  // Fetch projects when component loads
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects"); // Backend endpoint
        
        
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Create a new project
  const handleCreateProject = async () => {
    if (newProject) {
      try {
        const response = await api.post("/projects", { title: newProject });
      
        setProjects([...projects, response.data]); // Add new project to state
        setNewProject(""); // Clear input
      } catch (error) {
        console.error("Error creating project:", error);
      }
    }
  };


  return (
    <div className="home-container">
      <Header />
      <header>
        <h1>My Projects</h1>
        <div className="create-project">
          <input
            type="text"
            placeholder="Enter project name"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
          />
          <button onClick={handleCreateProject}>Create New Project</button>
        </div>
      </header>
      <div className="project-list">
  {projects.map((project) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(project.createdDate));

    return (
      <div
        key={project.id}
        className="project-card"
        onClick={() => navigate(`/project/${project._id}`)}
      >
        <h3>{project.title}</h3>
        <p>{formattedDate}</p>
      </div>
    );
  })}
</div>

    </div>
  );
}

export default Home;
