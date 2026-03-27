import React, { useRef } from "react";
import { UploadCloud, Trash2, Star } from "lucide-react";

export default function StepResume({ data, onChange }) {
  const fileRef = useRef(null);
  const resumes = data.resumes || [];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newResumes = files.map((f) => ({ name: f.name, url: "", isPrimary: resumes.length === 0 }));
    onChange({ resumes: [...resumes, ...newResumes] });
    e.target.value = "";
  };

  const handleDelete = (idx) => {
    const updated = resumes.filter((_, i) => i !== idx);
    if (updated.length > 0 && !updated.some((r) => r.isPrimary)) {
      updated[0].isPrimary = true;
    }
    onChange({ resumes: updated });
  };

  const handleSetPrimary = (idx) => {
    const updated = resumes.map((r, i) => ({ ...r, isPrimary: i === idx }));
    onChange({ resumes: updated });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newResumes = files.map((f) => ({ name: f.name, url: "", isPrimary: resumes.length === 0 }));
    onChange({ resumes: [...resumes, ...newResumes] });
  };

  return (
    <div className="profile-step">
      <h3 className="profile-step__title">Upload Resume</h3>
      <p className="profile-step__desc">Upload your resume. You can add multiple versions and mark one as primary.</p>

      <div
        className="profile-upload-zone"
        onClick={() => fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
        aria-label="Upload resume files"
      >
        <UploadCloud size={32} className="profile-upload-zone__icon" />
        <p className="profile-upload-zone__text">Click or drag files here to upload</p>
        <p className="profile-upload-zone__hint">PDF, DOC, DOCX accepted</p>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          className="profile-hidden-input"
          onChange={handleFileChange}
          aria-hidden="true"
        />
      </div>

      {resumes.length > 0 && (
        <ul className="profile-resume-list" aria-label="Uploaded resumes">
          {resumes.map((resume, idx) => (
            <li key={idx} className={`profile-resume-item${resume.isPrimary ? " is-primary" : ""}`}>
              <span className="profile-resume-name">{resume.name}</span>
              <div className="profile-resume-actions">
                {resume.isPrimary && (
                  <span className="profile-badge-primary" aria-label="Primary resume">Primary</span>
                )}
                {!resume.isPrimary && (
                  <button
                    type="button"
                    className="profile-btn-icon"
                    onClick={() => handleSetPrimary(idx)}
                    title="Set as Primary"
                    aria-label={`Set ${resume.name} as primary`}
                  >
                    <Star size={16} />
                  </button>
                )}
                <button
                  type="button"
                  className="profile-btn-icon profile-btn-icon--danger"
                  onClick={() => handleDelete(idx)}
                  title="Delete resume"
                  aria-label={`Delete ${resume.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {resumes.length === 0 && (
        <p className="profile-empty-state">No resume uploaded</p>
      )}
    </div>
  );
}
