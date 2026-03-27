import React from "react";
import "../styles/auth.css";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <aside className="left-panel">
        <div className="left-content">
          <div>
            “The Key For Us, Number One, Has Always Been Hiring Very Smart People.”
          </div>
          <strong>Bill Gates<br />Co-Founder Of Microsoft Corporation</strong>
        </div>
      </aside>

      <main className="right-panel">
        <div className="auth-card">
          <div className="card-logo">
            <img src="/assets/logo.png" alt="Logo" />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
