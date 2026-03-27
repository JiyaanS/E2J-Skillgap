import React, { useState } from "react";
import { X } from "lucide-react";

const emptyEd = { degree: "", college: "", specialization: "", yearOfPassing: "", currentlyPursuing: false, percentage: "" };

export default function EducationModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || emptyEd);
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const validate = () => {
    const errs = {};
    if (!form.degree) errs.degree = "Required";
    if (!form.college) errs.college = "Required";
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSave(form);
  };

  return (
    <div className="profile-modal-overlay" role="dialog" aria-modal="true" aria-label="Education details">
      <div className="profile-modal">
        <div className="profile-modal__header">
          <h3>{initial ? "Edit Education" : "Add Education"}</h3>
          <button type="button" onClick={onClose} className="profile-modal__close" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="profile-modal__body">
          <div className="profile-grid-2">
            <div className="profile-field">
              <label className="profile-field__label">Degree <span className="profile-required">*</span></label>
              <input className={`profile-input${errors.degree ? " profile-input--error" : ""}`} value={form.degree} onChange={set("degree")} placeholder="e.g. B.Tech, MBA" />
              {errors.degree && <span className="profile-error">{errors.degree}</span>}
            </div>
            <div className="profile-field">
              <label className="profile-field__label">College/University <span className="profile-required">*</span></label>
              <input className={`profile-input${errors.college ? " profile-input--error" : ""}`} value={form.college} onChange={set("college")} placeholder="Institution name" />
              {errors.college && <span className="profile-error">{errors.college}</span>}
            </div>
            <div className="profile-field">
              <label className="profile-field__label">Specialization</label>
              <input className="profile-input" value={form.specialization} onChange={set("specialization")} placeholder="e.g. Computer Science" />
            </div>
            <div className="profile-field">
              <label className="profile-field__label">Percentage / CGPA</label>
              <input className="profile-input" value={form.percentage} onChange={set("percentage")} placeholder="e.g. 8.5 or 85%" />
            </div>
            <div className="profile-field">
              <label className="profile-field__label">Year of Passing</label>
              <input className="profile-input" type="number" min="1990" max="2030" value={form.yearOfPassing} onChange={set("yearOfPassing")} placeholder="2024" disabled={form.currentlyPursuing} />
            </div>
            <div className="profile-field profile-field--checkbox">
              <label className="profile-checkbox-label">
                <input type="checkbox" checked={form.currentlyPursuing} onChange={set("currentlyPursuing")} />
                <span>Currently Pursuing</span>
              </label>
            </div>
          </div>
        </div>
        <div className="profile-modal__footer">
          <button type="button" className="profile-btn-secondary" onClick={onClose}>Cancel</button>
          <button type="button" className="profile-btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
