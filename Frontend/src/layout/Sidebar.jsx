import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Target,
  BookOpen,
  Briefcase,
  HeartHandshake,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { designTokens } from "../styles/designTokens";

const navItems = [
  { key: "home", label: "Home", icon: Home, to: "/dashboard" },
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { key: "aspirations", label: "My Aspirations", icon: Target, to: "/dashboard/aspirations" },
  { key: "courses", label: "Courses", icon: BookOpen },
  { key: "jobs", label: "Job Listing", icon: Briefcase },
  { key: "counselling", label: "Counselling", icon: HeartHandshake },
  { key: "profile", label: "Profile", icon: User, to: "/profile" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const sidebarStyle = {
    background: designTokens.sidebarBackground,
    borderRight: `1px solid ${designTokens.borderColor}`,
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="dashboard-sidebar" style={sidebarStyle}>
      <div className="sidebar-logo">
        <div className="sidebar-logo__icon">
          <LayoutDashboard size={20} />
        </div>
        <span className="sidebar-logo__text">HH</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <div className="sidebar-icon-wrapper">
                <Icon size={18} />
              </div>
              <span className="sidebar-label">{item.label}</span>
            </>
          );

          if (!item.to) {
            return (
              <div key={item.key} className="sidebar-item disabled">
                {content}
              </div>
            );
          }

          return (
            <NavLink
              key={item.key}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
              end
            >
              {content}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-item disabled">
          <div className="sidebar-icon-wrapper">
            <Settings size={18} />
          </div>
          <span className="sidebar-label">Setting</span>
        </div>

        <button className="sidebar-item sidebar-logout" type="button" onClick={handleLogout}>
          <div className="sidebar-icon-wrapper">
            <LogOut size={18} />
          </div>
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
