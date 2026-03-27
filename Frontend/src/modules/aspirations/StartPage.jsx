import React from "react";

export default function StartPage({ onContinue }) {
  return (
    <div className="aspirations-stage">
      <div className="aspirations-illustration" aria-hidden="true">
        <div className="aspirations-illustrationPlaceholder">Illustration</div>
      </div>

      <div className="aspirations-copy">
        <h2 className="aspirations-heading">
          Discover Your Strengths, Identify Your Skill Gaps,
          <br />
          And Get Ready For Your Dream Career.
        </h2>

        <button className="aspirations-primaryButton" type="button" onClick={onContinue}>
          Let&apos;s Get Started
        </button>
      </div>
    </div>
  );
}
