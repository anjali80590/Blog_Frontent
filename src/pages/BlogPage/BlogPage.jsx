
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./BlogPage.css";

const BlogPage = () => {
  return (
    <div className="main-blog-page">
      
        <div className="sidebar-blog">
          <Sidebar />
        </div>
        <div className="content-blog">
          <Outlet />
        </div>
 
    </div>
  );
};

export default BlogPage;