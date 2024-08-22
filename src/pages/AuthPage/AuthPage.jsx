import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../utils/baseUrl";
import "./AuthPage.css";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};
    if (!email || !password) {
      errors.general = "Email and password are required";
    }
    if (!isLogin && !name) {
      errors.name = "Name is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please include a valid email";
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsLoading(true);

    const url = isLogin
      ? `${baseUrl}/api/auth/login`
      : `${baseUrl}/api/auth/register`;
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        navigate("/blog/reading-list");
      } else {
        setErrors({
          general: data.error || `${isLogin ? "Login" : "Signup"} failed`,
        });
      }
    } catch (error) {
      setErrors({ general: "An error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="auth-page">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {errors.general && <p className="error">{errors.general}</p>}

        {!isLogin && (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="text"
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit" className="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="loader"></div>
          ) : isLogin ? (
            "Login"
          ) : (
            "Signup"
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="toggle-button"
          disabled={isLoading}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="cancel-button"
          disabled={isLoading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
