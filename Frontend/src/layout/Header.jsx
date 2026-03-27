import React from "react";
import { Bell, User } from "lucide-react";
import { designTokens } from "../styles/designTokens";

export default function Header({ title = "Dashboard", userName = "User", userRole = "Guest" }) {
  const headerStyle = {
    borderBottom: `1px solid ${designTokens.borderColor}`,
  };

  return (
    <header className="dashboard-header" style={headerStyle}>
      <div className="header-title">{title}</div>

      <div className="header-right">
        <button className="header-icon" type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>

        <div className="header-user">
          <div className="header-avatar">
            <User size={18} />
          </div>
          <div className="header-userText">
            <div className="header-userName">{userName}</div>
            <div className="header-userRole">{userRole}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
