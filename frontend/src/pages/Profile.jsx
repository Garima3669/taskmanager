import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaCamera,
  FaFire,
  FaCheckCircle,
  FaTasks,
  FaChartLine,
  FaArrowLeft
} from "react-icons/fa";

import { toast } from "react-toastify";
import API from "../services/api";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

import "../styles/Profile.css";

function Profile() {
  const { user, tasks, getProfile } = useAuth();

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    bio: "",
    avatar: "",
  });

  // ===========================
  // Load Profile
  // ===========================

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
        dob: user.dob ? user.dob.substring(0, 10) : "",
        address: user.address || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  // ===========================
  // Productivity Stats
  // ===========================

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  const streak = 0; // Replace later

  // ===========================
  // Handle Input
  // ===========================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ===========================
  // Validation
  // ===========================

  const validateForm = () => {
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const address = formData.address.trim();
    const bio = formData.bio.trim();

    if (!name) {
      toast.error("Name is required");
      return false;
    }

    if (name.length < 3) {
      toast.error("Name must contain at least 3 characters");
      return false;
    }

    if (name.length > 50) {
      toast.error("Name cannot exceed 50 characters");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error("Name can contain only letters and spaces");
      return false;
    }

    if (
      phone &&
      !/^[6-9]\d{9}$/.test(phone)
    ) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }

    if (
      formData.gender &&
      !["Male", "Female", "Other"].includes(formData.gender)
    ) {
      toast.error("Please select a valid gender");
      return false;
    }

    if (formData.dob) {
      const dob = new Date(formData.dob);

      if (dob > new Date()) {
        toast.error(
          "Date of Birth cannot be in the future"
        );
        return false;
      }
    }

    if (address.length > 100) {
      toast.error(
        "Address cannot exceed 100 characters"
      );
      return false;
    }

    if (bio.length > 250) {
      toast.error(
        "Bio cannot exceed 250 characters"
      );
      return false;
    }

    return true;
  };

  // ===========================
  // Save Profile
  // ===========================

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);

      const payload = {
        ...formData,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        bio: formData.bio.trim(),
      };

      const res = await API.put(
        "/user/profile",
        payload
      );

      toast.success(res.data.message);

      await getProfile();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Profile update failed"
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <Navbar />

      <div className="profile-page">

        <h1 className="profile-title">
          My Profile
        </h1>

        {/* ================= TOP ================= */}

        <div className="profile-top">

          {/* Left */}

          <div className="profile-card">

            <div className="profile-avatar">

              <div className="avatar-logo">

                {user?.name?.charAt(0).toUpperCase()}

              </div>

            </div>
            
            <h2>{formData.name || "User"}</h2>

            <p>{formData.email}</p>

          </div>

          {/* Right */}

          <div className="stats-card">

            <h2>Productivity</h2>

            <div className="profile-stat">

              <FaCheckCircle />

              <span>Completed</span>

              <strong>{completed}</strong>

            </div>

            <div className="profile-stat">

              <FaTasks />

              <span>Pending</span>

              <strong>{pending}</strong>

            </div>

            <div className="profile-stat">

              <FaChartLine />

              <span>Completion</span>

              <strong>{completionRate}%</strong>

            </div>

            <div className="profile-stat">

              <FaFire />

              <span>Current Streak</span>

              <strong>{streak} Days</strong>

            </div>

          </div>

        </div>

        {/* ================= FORM ================= */}

        <form
          className="profile-form"
          onSubmit={handleSave}
        >

          <h2>Personal Information</h2>

          <div className="profile-grid">

            {/* Name */}

            <div className="input-group">

              <label>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                maxLength={50}
              />

            </div>

            {/* Email */}

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
              />

            </div>

            {/* Phone */}

            <div className="input-group">

              <label>Phone</label>

              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            {/* Gender */}

            <div className="input-group">

              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            {/* DOB */}

            <div className="input-group">

              <label>Date of Birth</label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />

            </div>

            {/* Address */}

            <div className="input-group">

              <label>Address</label>

              <input
                type="text"
                name="address"
                placeholder="Enter address"
                maxLength={100}
                value={formData.address}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Bio */}

          <div className="input-group">

            <label>Bio</label>

            <textarea
              rows="5"
              name="bio"
              placeholder="Tell something about yourself..."
              maxLength={250}
              value={formData.bio}
              onChange={handleChange}
            />

            <small
              style={{
                float: "right",
                color: "var(--text2)",
                marginTop: "6px",
              }}
            >
              {formData.bio.length}/250
            </small>

          </div>

          {/* Save */}

          <button
            className="save-btn"
            type="submit"
            disabled={saving}
          >

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </form>

      </div>
    </>
  );
}

export default Profile;