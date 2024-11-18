import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
// import GistExportSuccess from "./pages/GistExportSuccess";
// import NotFound from "./pages/NotFound";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
// import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
       

        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
       
      </Routes>
      </BrowserRouter>
   
  );
}

export default App;
