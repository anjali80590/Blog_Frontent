import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../utils/baseUrl";
import "./UpdateBlogForm.css";

const UpdateBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    excerpt: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/posts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      toast.success("Post updated successfully!");
      setTimeout(() => {
        navigate(`/blog/posts`);
      }, 1500);
    } catch (error) {
      setError(error.message);
      toast.error("Failed to update post.");
    }
  };

  const handleCancel = () => {
    navigate(`/blog/posts`);
  };

  if (loading)
    return (
      <div
        style={{
          color: "#b08d4f",
          display: "flex",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page-container">
      <ToastContainer />
      <div className="update-blog-form">
        <h2>Update Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ fontWeight: "bold" }}>Title :</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Excerpt :</label>
            <input
              type="text"
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
              required
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Content :</label>
            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              required
            />
          </div>
          <div className="form-actions">
            <button className="submit-button" type="submit">
              Update Blog
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogForm;
