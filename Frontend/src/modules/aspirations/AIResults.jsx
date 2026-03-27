import React from "react";
import { useNavigate } from "react-router-dom";
import AIVisualization from "../../components/AI/AIVisualization";

/**
 * AIResults Component
 * 
 * Displays AI-generated career insights and roadmap.
 * Shows placeholder while AI generates results.
 * Allows users to navigate to profile for editing certifications.
 */
export default function AIResults({ aiResult }) {
  return (
    <div className="ai-results">
      <div className="ai-results-header">
        <h2 className="ai-results-title">Your Career Insights</h2>
        <p className="ai-results-subtitle">AI-generated career roadmap</p>
      </div>

      <div className="ai-results-content">
        <div className="ai-results-main-card">
          {aiResult ? (
            <AIVisualization data={aiResult} />
          ) : (
            <div className="ai-results-placeholder">
              <div className="ai-results-placeholder-content">
                <div className="ai-results-loader"></div>
                <p className="ai-results-placeholder-text">
                  AI Analysis in Progress / Coming Soon
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
