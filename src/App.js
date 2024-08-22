
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
// import BlogDetail from "./components/BlogDetail/BlogDetail";
import BlogPage from "./pages/BlogPage/BlogPage";
import NewBlogForm from "./components/NewBlogForm/NewBlogForm";
import ReadBlogs from "./components/ReadBlogs/ReadBlogs";
import UserPosts from "./components/UserPosts/UserPosts";
import AuthPage from "./pages/AuthPage/AuthPage";
import UpdateBlogForm from "./components/UpdateBlogForm/UpdateBlogForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* <Route path="/posts/:id" element={<BlogDetail />} /> */}

        {/* BlogPage routes */}
        <Route path="/blog" element={<BlogPage />}>
          <Route path="new-blog" element={<NewBlogForm />} />
          <Route path="reading-list" element={<ReadBlogs/>} />
          <Route path="posts" element={<UserPosts />} />
          <Route path="update/:id" element={<UpdateBlogForm />} />{" "}
          {/* Route for updating */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
