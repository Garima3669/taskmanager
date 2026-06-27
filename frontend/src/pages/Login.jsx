import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const { getProfile, getTasks } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      await getProfile();
      await getTasks();

      toast.success("Login Successful 🎉");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <FaTasks />
        </div>

        <h1>Welcome Back</h1>

        <p>Sign in to continue managing your tasks</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />

          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="bottom-text">
          Don't have an account?
          <Link to="/signup"> Create Account</Link>
        </div>

      </div>

    </div>
  );
}

export default Login;