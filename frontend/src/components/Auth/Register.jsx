import { useState } from "react";
import Swal from "sweetalert2"; 
import "../../styles/Auth.css";
import api from "../../services/api";
import { useNavigate,Link } from "react-router-dom"; 


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    
    console.log("Form Data:", { username, email, password }); // Log the form data
    
    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
      });
      console.log("Response:", response);
  
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: response.data.msg,
        confirmButtonText: 'OK',
      });
      navigate("/login")
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Show validation error alert
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.response.data.errors[0].msg,
          confirmButtonText: 'OK',
        });
      } else {
        // Show generic error alert
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Something went wrong. Please try again.',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form-header">Register</h2>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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
          <button type="submit">Register</button>
        </div>
        <div className="register-link">
          <p>
            Already have an account? <Link to="/login">Login here</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
