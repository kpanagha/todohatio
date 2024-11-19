
---

# 📝 **To-Do Management Application**  
A feature-rich to-do management system built using the **MERN stack** (MongoDB, Express, React, Node.js). This application allows users to manage projects, add and update to-dos, track progress, and export project summaries as secret GitHub gists.

---

## 🌟 **Features**
- **Project Management**: Create, list, and view projects.  
- **To-Do Management**: Add, update, delete, and mark to-dos as complete or pending.  
- **Authentication**: Basic authentication for user login.  
- **Export Gists**: Export project summaries as markdown GitHub gists, saved locally.  

---

## ⚙️ **Prerequisites**
Before setting up the project, ensure you have the following installed:
- **Node.js** (version 14 or above)  
- **MongoDB** (or use MongoDB Atlas)  
- **Git**

---

## 🚀 **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/kpanagha/todohatio.git
cd TODO
```

---

### **2. Backend Setup**  
#### a. Install Backend Dependencies  
Navigate to the backend directory and install the required packages:
```bash
cd backend
npm install
```

#### b. Configure `.env`  
Create a `.env` file in the `backend` directory with the following environment variables:
```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
JWT_SECRET=<your-jwt-secret>
GITHUB_TOKEN=<your-github-token>
```

#### c. Run the Backend  
Start the backend server:
```bash
npm start
```
The backend server will run at: **http://localhost:5000**

---

### **3. Frontend Setup**  
#### a. Install Frontend Dependencies  
Navigate to the frontend directory and install the required packages:
```bash
cd frontend
npm install
```

#### b. Run the Frontend  
Start the frontend development server:
```bash
npm run dev
```
The frontend server will run at: **http://localhost:5173**

---

### **4. Testing**  
- **Backend**: Open **http://localhost:5000** in your browser.  
- **Frontend**: Open **http://localhost:5173** in your browser.  

For testing API endpoints, use a tool like **Postman**. Example endpoints:  

#### **Authentication**  
- `POST /api/auth/register` - Register a new user  
- `POST /api/auth/login` - Login with user credentials  

#### **Project Management**  
- `POST /api/projects` - Create a new project  
- `PUT /api/projects/:id` - Edit a project's title  
- `GET /api/projects` - List all projects  
- `GET /api/projects/:id` - Get details of a specific project  
- `POST /api/projects/:id/export` - Export a project’s to-dos as a secret GitHub gist  

#### **To-Do Management**  
- `POST /api/todos/addtodo/:projectId` - Add a new to-do  
- `PUT /api/todos/updatetodo/:id` - Update a to-do's status  
- `DELETE /api/todos/deletetodo/:id` - Delete a to-do  

---

## 🛠️ **Additional Notes**
- Ensure your `.env` file is **NOT committed to version control** by adding it to your `.gitignore` file.  
- For production environments, always secure your credentials using environment variables or GitHub Secrets.

---

By following this guide, you can successfully set up and run the **To-Do Management Application**. 


