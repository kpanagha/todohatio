import  { useState } from 'react';
import Swal from "sweetalert2";
import "../../styles/Auth.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    // Client-side validation
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      // API call to the backend
      console.log({ email, password }); 
      const response = await api.post('/auth/login', { email, password });
     

    
      // Extract token from the response
      const { token } = response.data;

      // Save token to localStorage or sessionStorage
      localStorage.setItem("token", token);

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have been successfully logged in.",
        confirmButtonText: "OK",
      });
      navigate("/home"); // Replace "/" with your desired home route
     
    } catch (error) {
      console.error("API Error:", error.response);
      // Handle errors
      if (error.response && error.response.data.msg) {
        console.log("error response",error.response);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.msg, // Use error message from backend
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Something went wrong. Please try again.",
          confirmButtonText: "OK",
        });
      }
    }
  };
  

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form-header">Login</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
          required
        />
<div className="button-container">
        <button type="submit">Login</button>
        </div>
       
      </form>
                                     
    </div>
  );
};

export default Login;