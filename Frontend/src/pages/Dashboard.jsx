import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

export default function Dashboard() {
  const userName = localStorage.getItem("userName") || "Student";
  const userRole = localStorage.getItem("userRole") || "Student";

  return (
    <DashboardLayout title="Home" userName={userName} userRole={userRole}>
      <div className="dashboard-welcome">
        <h2>Welcome Back</h2>
        <p className="dashboard-intro">Your personalized dashboard will appear here.</p>
        <div className="dashboard-widgets" />
      </div>
    </DashboardLayout>
  );
}
