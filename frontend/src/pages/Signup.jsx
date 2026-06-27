import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../services/api";
import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    try {
      setLoading(true);

      const res = await API.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        {/* Logo */}
        <div className="signup-logo">
          <FaTasks />
        </div>

        {/* Heading */}
        <h1>Create Account</h1>

        <p>
          Manage your work smarter with Task Manager
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
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
              required
            />
          </div>

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* Divider */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* Footer */}
        <div className="bottom-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>

      </div>

    </div>
  );
}

export default Signup;