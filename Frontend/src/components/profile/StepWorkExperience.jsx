import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import WorkModal from "./WorkModal";

export default function StepWorkExperience({ data, onChange }) {
  const work = data.work || [];
  const [modal, setModal] = useState(null);

  const saveWork = (item) => {
    if (modal.mode === "add") {
      onChange({ work: [...work, item] });
    } else {
      onChange({ work: work.map((w, i) => (i === modal.idx ? item : w)) });
    }
    setModal(null);
  };
  const deleteWork = (idx) => onChange({ work: work.filter((_, i) => i !== idx) });

  const formatDate = (d) => {
    if (!d) return "";
    const [y, m] = d.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[parseInt(m,10)-1] || ""} ${y}`;
  };

  return (
    <div className="profile-step">
      <h3 className="profile-step__title">Work Experience</h3>

      <div className="profile-section-header">
        <p className="profile-step__desc">Add your previous and current work experience.</p>
        <button type="button" className="profile-btn-add" onClick={() => setModal({ mode: "add" })}>
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {work.length === 0 ? (
        <p className="profile-empty-state">No work experience added yet. Click &quot;Add Experience&quot; to start.</p>
      ) : (
        <div className="profile-table-wrap">
          <table className="profile-table" aria-label="Work experience">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {work.map((w, idx) => (
                <tr key={idx}>
                  <td>{w.company}</td>
                  <td>{w.role}</td>
                  <td>{w.employmentType || "—"}</td>
                  <td>{formatDate(w.startDate)} – {w.currentlyWorking ? "Present" : formatDate(w.endDate)}</td>
                  <td>{w.location || "—"}</td>
                  <td>
                    <div className="profile-table-actions">
                      <button type="button" className="profile-btn-icon" onClick={() => setModal({ mode: "edit", idx, initial: w })} aria-label="Edit"><Pencil size={14} /></button>
                      <button type="button" className="profile-btn-icon profile-btn-icon--danger" onClick={() => deleteWork(idx)} aria-label="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <WorkModal
          initial={modal.initial}
          onSave={saveWork}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
