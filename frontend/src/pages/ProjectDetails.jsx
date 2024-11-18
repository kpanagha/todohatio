import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/ProjectDetails.css";
import { FaEdit,FaDownload } from 'react-icons/fa';


function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  


  // Fetch project details and todos
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`); // Using the Axios instance
        console.log(response);
        
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProject();
  }, [id]);


  const handleEditTitle = async () => {
    const newTitle = prompt('Edit Project Title:', editedTitle);
    if (newTitle && newTitle !== editedTitle) {
      try {
        const response = await api.put(`/projects/${project._id}`, // Use the API instance to make the PUT request
          { title: newTitle } // Request body with updated title
        );
        setEditedTitle(response.data.title); // Update title on successful response

        setProject((prevProject) => ({
          ...prevProject,
          title: response.data.title,
        }));
        alert('Project title updated successfully!');
      } catch (error) {
        console.error('Error updating project title:', error);
        alert('Failed to update project title');
      }
    }
  };

  


  
  const handleAddTodo = async () => {
    if (!newTodo.trim()) {
      alert("Todo description cannot be empty!");
      return;
    }
  
    try {
      const response = await api.post(`/todos/addtodo/${id}`, {
        description: newTodo,
        status: false, // Explicitly set as Boolean
      });
  
      // Add the new todo to the local state
      setProject((prevProject) => ({
        ...prevProject,
        todos: [...prevProject.todos, response.data],
      }));
  
      // Clear the input field
      setNewTodo("");
      alert("Todo added successfully!");
    } catch (error) {
      console.error("Error adding new todo:", error.response?.data || error.message);
      alert("Failed to add new todo. Please try again.");
    }
  };
  
  
  

  // Handle editing a todo
  const handleEditTodo = async (todoId, currentDescription) => {
    const newDescription = prompt("Edit Todo:", currentDescription);

    if (newDescription) {
      try {
        // Send a PUT request to the backend to update the todo
        const response = await api.put(`todos/updatetodo/${todoId}`, {
          description: newDescription,
        });

        // Update the local state with the updated todo
        setProject((prevProject) => ({
          ...prevProject,
          todos: prevProject.todos.map((todo) =>
            todo._id === todoId ? response.data : todo
          ),
        }));
      } catch (error) {
        console.error("Error editing todo:", error);
      }
    }
  };

  if (!project) return <div>Loading...</div>;

  // Handle deleting a todo
  const handleDeleteTodo = async (todoId) => {
    try {
      // Send DELETE request to the backend
      await api.delete(`todos/deletetodo/${todoId}`);
      
      // Remove the deleted todo from the local state
      setProject((prevProject) => ({
        ...prevProject,
        todos: prevProject.todos.filter((todo) => todo._id !== todoId),
      }));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (!project) return <div>Loading...</div>;

  // Handle toggling todo status
  const handleToggleStatus = async (todoId) => {
    const todoToUpdate = project.todos.find((todo) => todo._id === todoId);
    const updatedTodo = { ...todoToUpdate, status: !todoToUpdate.status };
  
    try {
      await api.put(`todos/updatetodo/${todoId}`, updatedTodo);
      setProject((prevProject) => ({
        ...prevProject,
        todos: prevProject.todos.map((todo) =>
          todo._id === todoId ? updatedTodo : todo
        ),
      }));
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };
  const handleExportGist = async () => {
    try {
      const response = await api.post(`/projects/${id}/export`); // Send request to backend
  
      if (response.status === 200) {
        alert('Gist exported successfully!');
        console.log('Gist URL:', response.data.gistUrl);  // Display Gist URL if needed
        window.open(response.data.gistUrl, '_blank');
      }
    } catch (error) {
      console.error("Error exporting gist:", error);
      alert('Failed to export gist');
    }
  };

  return (
    <div className="project-details">
      <h2>{project.title}
      <FaEdit 
          className="edit-icon" 
          onClick={handleEditTitle} // Trigger edit on click
        />
        <FaDownload className="export-gist-icon" onClick={handleExportGist} />
      </h2>

      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className="todo-list">
        <h3>Todos</h3>
        <ul>
          {project.todos.map((todo) => (
            <li key={todo._id}>
              <div className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => handleToggleStatus(todo._id)}
                />
                <span className={todo.status ? "completed" : ""}>
                  {todo.description}
                </span>
                <button
                  onClick={() =>
                    handleEditTodo(
                      todo._id,
                      prompt("Edit Todo:", todo.description)
                    )
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectDetails;
