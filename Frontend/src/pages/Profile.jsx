import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import InputField from "../components/InputField";

export default function Profile() {
  const userName = localStorage.getItem("userName") || "Student";
  const userRole = localStorage.getItem("userRole") || "Student";
  const userEmail = localStorage.getItem("userEmail") || "";

  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    phone: "",
    bio: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update API call
    setMessage("Profile update functionality coming soon");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <DashboardLayout title="Profile" userName={userName} userRole={userRole}>
      <div className="profile-container">
        <div className="profile-card">
          <h2>Your Profile</h2>
          {message && <div className="status-message success">{message}</div>}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              disabled
            />

            <InputField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
            />

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>

            <button type="submit" className="button">
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
