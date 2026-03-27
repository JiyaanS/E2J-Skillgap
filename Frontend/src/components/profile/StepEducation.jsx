import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import EducationModal from "./EducationModal";

export default function StepEducation({ data, onChange }) {
  const education = data.education || [];
  const certifications = data.certifications || [];
  const [edModal, setEdModal] = useState(null);

  const saveEducation = (item) => {
    if (edModal.mode === "add") {
      onChange({ education: [...education, item] });
    } else {
      const updated = education.map((e, i) => (i === edModal.idx ? item : e));
      onChange({ education: updated });
    }
    setEdModal(null);
  };
  const deleteEducation = (idx) => onChange({ education: education.filter((_, i) => i !== idx) });

  const addCert = () => onChange({ certifications: [...certifications, { name: "", issuer: "", year: "" }] });
  const updateCert = (idx, field, val) => {
    const updated = certifications.map((c, i) => (i === idx ? { ...c, [field]: val } : c));
    onChange({ certifications: updated });
  };
  const deleteCert = (idx) => onChange({ certifications: certifications.filter((_, i) => i !== idx) });

  return (
    <div className="profile-step">
      <h3 className="profile-step__title">Education</h3>

      <section className="profile-section">
        <div className="profile-section-header">
          <h4 className="profile-section__heading">Academic Qualifications</h4>
          <button type="button" className="profile-btn-add" onClick={() => setEdModal({ mode: "add" })}>
            <Plus size={16} /> Add Education
          </button>
        </div>

        {education.length === 0 ? (
          <p className="profile-empty-state">No education added yet. Click &quot;Add Education&quot; to start.</p>
        ) : (
          <div className="profile-table-wrap">
            <table className="profile-table" aria-label="Education entries">
              <thead>
                <tr>
                  <th>Degree</th>
                  <th>College / University</th>
                  <th>Specialization</th>
                  <th>Year</th>
                  <th>%/CGPA</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {education.map((ed, idx) => (
                  <tr key={idx}>
                    <td>{ed.degree}</td>
                    <td>{ed.college}</td>
                    <td>{ed.specialization || "—"}</td>
                    <td>{ed.currentlyPursuing ? "Pursuing" : ed.yearOfPassing || "—"}</td>
                    <td>{ed.percentage || "—"}</td>
                    <td>
                      <div className="profile-table-actions">
                        <button type="button" className="profile-btn-icon" onClick={() => setEdModal({ mode: "edit", idx, initial: ed })} aria-label="Edit"><Pencil size={14} /></button>
                        <button type="button" className="profile-btn-icon profile-btn-icon--danger" onClick={() => deleteEducation(idx)} aria-label="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="profile-section">
        <div className="profile-section-header">
          <h4 className="profile-section__heading">Certifications</h4>
          <button type="button" className="profile-btn-add" onClick={addCert}>
            <Plus size={16} /> Add Certification
          </button>
        </div>
        {certifications.length === 0 ? (
          <p className="profile-empty-state">No certifications added yet.</p>
        ) : (
          <div className="profile-cert-list">
            {certifications.map((cert, idx) => (
              <div key={idx} className="profile-cert-row">
                <input className="profile-input" value={cert.name} onChange={(e) => updateCert(idx, "name", e.target.value)} placeholder="Certification name" />
                <input className="profile-input" value={cert.issuer} onChange={(e) => updateCert(idx, "issuer", e.target.value)} placeholder="Issuing organization" />
                <input className="profile-input" value={cert.year} onChange={(e) => updateCert(idx, "year", e.target.value)} placeholder="Year" style={{ maxWidth: 100 }} />
                <button type="button" className="profile-btn-icon profile-btn-icon--danger" onClick={() => deleteCert(idx)} aria-label="Delete certification"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        )}
      </section>

      {edModal && (
        <EducationModal
          initial={edModal.initial}
          onSave={saveEducation}
          onClose={() => setEdModal(null)}
        />
      )}
    </div>
  );
}
