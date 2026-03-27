import React from "react";

const GOALS = [
  {
    id: "career",
    title: "Plan My Career Path",
    description:
      "Discover the right career roles for your background and learn what skills you need to get there.",
  },
  {
    id: "skills",
    title: "Level Up My Skills",
    description:
      "Strengthen the skills that matter most for your current or desired role.",
  },
  {
    id: "explore",
    title: "Explore & Discover Interests",
    description:
      "Explore topics, tools or technologies beyond your current domain.",
  },
];

export default function GoalSelection({ goal, setGoal, onNext }) {
  const handleNext = () => {
    if (!goal) {
      alert("Please select a goal before continuing.");
      return;
    }
    onNext();
  };
  return (
    <div className="aspirations-stage">
      <div className="aspirations-stepContent">
        <h2 className="aspirations-heading">What&apos;s Your Goal?</h2>
        <div className="aspirations-cardGrid">
          {GOALS.map((goalItem) => {
            const active = goal === goalItem.id;
            return (
              <button
                key={goalItem.id}
                type="button"
                className={`goal-card ${goal === goalItem.id ? "selected" : ""}`}
                onClick={() => {
                  if (goalItem.id === "career") setGoal("career");
                  else if (goalItem.id === "skills") setGoal("skills");
                  else if (goalItem.id === "explore") setGoal("explore");
                }}
              >
                <div className="aspirations-cardTitle">{goalItem.title}</div>
                <div className="aspirations-cardDescription">{goalItem.description}</div>
              </button>
            );
          })}
        </div>

        <div className="aspirations-actions">
          <button
            type="button"
            className="aspirations-primaryButton"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
