import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../utils/baseUrl";
import "./UserPosts.css";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          throw new Error("User is not authenticated");
        }

        const response = await fetch(`${baseUrl}/api/posts/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(`${baseUrl}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setPosts(posts.filter((post) => post._id !== id));

      toast.success("Post deleted successfully!");
    } catch (error) {
      setError(error.message);
      toast.error("Failed to delete post!");
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <div style={{ color: "#c1946a" }}>Loading...</div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-posts-container">
      <h2>My Blogs</h2>
      <ToastContainer />

      {posts.length > 0 && (
        <div className="table-of-contents">
          <h3>Contents</h3>
          <ul>
            {posts.map((post, index) => (
              <li key={post._id}>
                <a href={`#post-${post._id}`}>
                  {index + 1}. {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {posts.length === 0 ? (
        <p style={{ color: "#c1946a" }}>You have no blog posts yet.</p>
      ) : (
        <div className="posts-wrapper">
          {posts.map((post) => (
            <div key={post._id} id={`post-${post._id}`} className="post-box">
              <h3 className="post-title">Title: {post.title}</h3>
              <p className="post-summary">
                <strong>Summary: </strong> {post.excerpt}
              </p>
              <p className="post-content">
                <strong>Blog: </strong> {post.content}
              </p>
              <div className="post-actions">
                <Link to={`/blog/update/${post._id}`} className="update-button">
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
