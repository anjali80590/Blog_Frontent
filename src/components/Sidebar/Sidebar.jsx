
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
  
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <span>&#9776;</span>
      </div>

      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
     
        <div className="close-btn" onClick={toggleSidebar}>
          &times;
        </div>
        <Link to="/blog/new-blog"> Create New Blog</Link>
        <Link to="/blog/reading-list">Explore Blogs</Link>
        <Link to="/blog/posts">My Blogs</Link>
        <div className="logout">
          <Link to="/" className="logout-link">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
