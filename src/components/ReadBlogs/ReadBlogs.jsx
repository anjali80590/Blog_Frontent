import React, { useEffect, useState } from "react";
import baseUrl from "../../utils/baseUrl";
import "./ReadBlogs.css";

function ReadBlogs() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [commentError, setCommentError] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPosts, setExpandedPosts] = useState({}); // State for expanded posts

  // Get the logged-in user's ID from localStorage
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/posts`);
        const data = await response.json();

        if (response.ok) {
          setPosts(data);
        } else {
          setError("Failed to load posts");
        }
      } catch (err) {
        setError("An error occurred while fetching posts");
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach((post) => {
        fetchComments(post._id);
      });
    }
  }, [posts]);

  const fetchComments = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/api/comments/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: data,
        }));
      } else {
        console.error("Failed to load comments");
      }
    } catch (err) {
      console.error("An error occurred while fetching comments", err);
    }
  };

  const handleCommentChange = (e, postId) => {
    setNewComment({
      ...newComment,
      [postId]: e.target.value,
    });
  };

  const submitComment = async (postId) => {
    try {
      const response = await fetch(`${baseUrl}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          post: postId,
          content: newComment[postId] || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors ? data.errors[0].msg : data.message);
      }

      setNewComment({
        ...newComment,
        [postId]: "",
      });

      fetchComments(postId);
    } catch (err) {
      setCommentError({
        ...commentError,
        [postId]: err.message || "An error occurred",
      });
    }
  };

  const deleteComment = async (commentId, postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete comment");
      }

      setComments((prevComments) => ({
        ...prevComments,
        [postId]: prevComments[postId].filter(
          (comment) => comment._id !== commentId
        ),
      }));
    } catch (err) {
      console.error("An error occurred while deleting the comment", err);
      alert(err.message); // Display the error to the user
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="reading">
      <h2>Read Blogs</h2>

      {/* Table of Contents */}
      <div className="table-of-contents">
        <h3>Contents</h3>
        <ul>
          {filteredPosts.map((post, index) => (
            <li key={post._id}>
              <a href={`#post-${post._id}`}>
                {index + 1}. {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search blogs by Title ..."
        className="search-input"
      />
      {error && <p className="error">{error}</p>}
      {filteredPosts.length === 0 ? (
        <p style={{ color: "#8e44ad" }}>No Blog posts available.</p>
      ) : (
        <ul>
          {filteredPosts.map((post) => (
            <li
              key={post._id}
              className="post-item-reading"
              id={`post-${post._id}`}
            >
              <h3>Title: {post.title}</h3>
              <p>
                <strong className="summary">Excerpt : </strong>
                {post.excerpt}
              </p>
              <button
                className="read-more"
                onClick={() => handleToggleExpand(post._id)}
              >
                {expandedPosts[post._id] ? "Read Less" : "Read More"}
              </button>
              {expandedPosts[post._id] && (
                <div className="post-content-reading">
                  <h4>Blog:</h4>
                  <p>{post.content}</p>
                </div>
              )}

              <div className="comments-section">
                <h4>Comments:</h4>
                {comments[post._id] && comments[post._id].length > 0 ? (
                  <ul className="comment-list">
                    {comments[post._id].map((comment) => (
                      <li key={comment._id}>
                        <strong>{comment.author.name}:</strong>
                        <div>
                          <div className="comment-content">
                            {comment.content}
                          </div>
                          {comment.author._id === loggedInUserId && ( // Conditionally render delete button
                            <button
                              className="delete-comment-button"
                              onClick={() =>
                                deleteComment(comment._id, post._id)
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "15px" }}>No comments yet.</p>
                )}

                <div className="comment-input">
                  <input
                    type="text"
                    value={newComment[post._id] || ""}
                    onChange={(e) => handleCommentChange(e, post._id)}
                    placeholder="Write a comment..."
                  />
                  <button onClick={() => submitComment(post._id)}>
                    Comment
                  </button>
                </div>
                {commentError[post._id] && (
                  <p className="error">{commentError[post._id]}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReadBlogs;
