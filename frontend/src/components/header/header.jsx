import { useState } from "react";


const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleLogout = async () => {
    try {
      // Clear token from localStorage or sessionStorage
      localStorage.removeItem("authToken");
  
      // Redirect to login page
      window.location.href = "/login ";
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out");
    }
  };

  return (
    <header style={styles.header}>
      {/* User Name Section */}
      <div style={styles.userSection}>
        <span style={styles.userName}>Welcome, User</span>
      </div>

      {/* Dropdown and Logout */}
      <div style={styles.actionSection}>
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

// Styles
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#FF9800",
    color: "white",
    width: "100%",
    top:"0px",
    position: "sticky",
    
    zIndex: 1000,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Optional for visual separation
  },
  userSection: {
    flex: 1,
  },
  userName: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "black",
    border: "none",
    color: "white",
    padding: "15px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Header;
