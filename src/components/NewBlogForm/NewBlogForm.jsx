import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../utils/baseUrl";
import "./NewBlogForm.css";

function NewBlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!content) errors.content = "Content is required";
    if (!excerpt) errors.excerpt = "Excerpt is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      console.log("Submitting form...");
      const response = await fetch(`${baseUrl}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, content, excerpt }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Form submitted successfully");
        toast.success("Blog Submitted Successfully!");
        setTimeout(() => {
          navigate(`/blog/posts`);
        }, 1500);
      } else {
        console.log("Form submission failed");
        setErrors({ general: "Failed to create post" });
        toast.error("Failed to create post");
      }
    } catch (error) {
      console.log("An error occurred during submission");
      setErrors({ general: "An error occurred" });
      toast.error("An error occurred");
    }
  };

  const handleCancel = () => {
    navigate("/blog/reading-list");
  };

  return (
    <div className="page-container">
      <div className="new-blog-form">
        <h2>Create a New Blog Post</h2>
        {errors.general && <p className="error">{errors.general}</p>}

        <form className="newForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title"></label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title"
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="content"></label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content"
            />
            {errors.content && <p className="error">{errors.content}</p>}
          </div>

          <div>
            <label htmlFor="excerpt"></label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Enter the excerpt"
            />
            {errors.excerpt && <p className="error">{errors.excerpt}</p>}
          </div>

          <div className="form-actions">
            <button className="submit-button-blog" type="submit">
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button-blog"
            >
              Cancel
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default NewBlogForm;
