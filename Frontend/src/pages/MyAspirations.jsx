import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import GoalSelection from "../modules/aspirations/GoalSelection";
import "../styles/aspirations.css";

export default function MyAspirations() {
  const userName = localStorage.getItem("userName") || "Student";
  const userRole = localStorage.getItem("userRole") || "Student";
  const [goal, setGoal] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    setSubmitted(true);
  };

  return (
    <DashboardLayout title="My Aspirations" userName={userName} userRole={userRole}>
      <div className="aspirations-container">
        {!submitted ? (
          <GoalSelection goal={goal} setGoal={setGoal} onNext={handleNext} />
        ) : (
          <div className="aspirations-placeholder">
            <h2>Your AI Diagram</h2>
            <p>AI diagram will be displayed here</p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setGoal(null);
              }}
              className="button-secondary"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
