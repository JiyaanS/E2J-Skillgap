import React, { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import StepResume from "../components/profile/StepResume";
import StepPersonal from "../components/profile/StepPersonal";
import StepEducation from "../components/profile/StepEducation";
import StepWorkExperience from "../components/profile/StepWorkExperience";
import StepSkills from "../components/profile/StepSkills";
import { getProfile, saveProfile } from "../services/profileService";
import "../styles/profile.css";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Resume" },
  { label: "Personal Info" },
  { label: "Education" },
  { label: "Work Experience" },
  { label: "Skills" },
];

const EMPTY_PROFILE = {
  resumes: [],
  title: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  gender: "",
  nationality: "",
  maritalStatus: "",
  physicallyChallenged: "",
  bloodGroup: "",
  mobilePrimary: "",
  mobileAlternate: "",
  presentAddress: {},
  permanentAddress: {},
  socialMedia: {},
  education: [],
  certifications: [],
  work: [],
  experienceCategory: "",
  totalExperience: "",
  skills: [],
  languages: [],
  jobPreferences: {},
};

// Returns an object of field errors for the given step
function validateStep(stepIndex, data) {
  const errors = {};

  if (stepIndex === 1) {
    if (!data.title) errors.title = "Title is required";
    if (!data.firstName?.trim()) errors.firstName = "First name is required";
    if (!data.lastName?.trim()) errors.lastName = "Last name is required";
    if (!data.dob) errors.dob = "Date of birth is required";
    if (!data.gender) errors.gender = "Gender is required";
    if (!data.nationality?.trim()) errors.nationality = "Nationality is required";
    const digits = (data.mobilePrimary || "").replace(/\D/g, "");
    if (!digits) {
      errors.mobilePrimary = "Mobile number is required";
    } else if (digits.length !== 10) {
      errors.mobilePrimary = "Enter a valid 10-digit mobile number";
    }
    if (!data.presentAddress?.line1?.trim()) errors["address.line1"] = "Address line 1 is required";
    if (!data.presentAddress?.city?.trim()) errors["address.city"] = "City is required";
    if (!data.presentAddress?.state?.trim()) errors["address.state"] = "State is required";
    if (!data.presentAddress?.country?.trim()) errors["address.country"] = "Country is required";
    if (!data.presentAddress?.pincode?.trim()) errors["address.pincode"] = "Pincode is required";
  }

  if (stepIndex === 3) {
    if (!data.experienceCategory?.trim()) errors.experienceCategory = "Experience category is required";
    if (!data.totalExperience?.trim()) errors.totalExperience = "Total experience is required";
  }

  if (stepIndex === 4) {
    if (!data.skills?.length) errors.skills = "Add at least one skill";
    if (!data.jobPreferences?.currentCTC?.trim()) errors.currentCTC = "Current CTC is required";
    if (!data.jobPreferences?.expectedCTC?.trim()) errors.expectedCTC = "Expected CTC is required";
    if (!data.jobPreferences?.noticePeriod?.trim()) errors.noticePeriod = "Notice period is required";
  }

  return errors;
}

function ProfileStepper({ currentStep, completedSteps }) {
  return (
    <div className="profile-stepper" role="list" aria-label="Profile form steps">
      {STEPS.map((step, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = completedSteps.has(idx);
        return (
          <div
            key={step.label}
            className={`profile-stepper-item${isActive ? " active" : ""}${isCompleted ? " completed" : ""}`}
            role="listitem"
            aria-current={isActive ? "step" : undefined}
          >
            <div className="profile-stepper-dot">
              {isCompleted && !isActive ? <Check size={16} /> : idx + 1}
            </div>
            <span className="profile-stepper-label">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Profile() {
  const userName = localStorage.getItem("userName") || "Student";
  const userRole = localStorage.getItem("userRole") || "Student";
  const userEmail = localStorage.getItem("userEmail") || "";

  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [profileData, setProfileData] = useState({ ...EMPTY_PROFILE, email: userEmail });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
  // showErrors: whether to display validation errors (triggered on Next/Submit attempt)
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { profile } = await getProfile();
        if (profile) {
          setProfileData({ ...EMPTY_PROFILE, ...profile, email: userEmail });
          setIsExisting(true);
          setIsEditMode(false);
          if (profile.profileCompleted) {
            setCompletedSteps(new Set([0, 1, 2, 3, 4]));
          }
        } else {
          setIsEditMode(true);
        }
      } catch {
        setIsEditMode(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userEmail]);

  const updateProfileData = useCallback((changes) => {
    setProfileData((prev) => ({ ...prev, ...changes }));
  }, []);

  // Current step's validation errors
  const currentErrors = validateStep(step, profileData);
  const isStepValid = Object.keys(currentErrors).length === 0;

  const handleSaveDraft = async () => {
    setSaving(true);
    setError("");
    try {
      await saveProfile(profileData, true);
      setSuccessMsg("Draft saved successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      setError("Failed to save draft. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (!isStepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setCompletedSteps((prev) => new Set([...prev, step]));
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    }
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setShowErrors(false);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!isStepValid) {
      setShowErrors(true);
      return;
    }
    setSaving(true);
    setError("");
    try {
      await saveProfile(profileData, false);
      setCompletedSteps(new Set([0, 1, 2, 3, 4]));
      setIsExisting(true);
      setIsEditMode(false);
      setSuccessMsg("Profile saved successfully!");
      localStorage.setItem("profileCompleted", "true");
      if (profileData.firstName) {
        const fullName = [profileData.firstName, profileData.lastName].filter(Boolean).join(" ");
        localStorage.setItem("userName", fullName);
      }
      window.scrollTo(0, 0);
    } catch {
      setError("Failed to submit profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const activeErrors = showErrors ? currentErrors : {};

  const renderStep = () => {
    const props = { data: profileData, onChange: updateProfileData, errors: activeErrors };
    switch (step) {
      case 0: return <StepResume {...props} />;
      case 1: return <StepPersonal {...props} />;
      case 2: return <StepEducation {...props} />;
      case 3: return <StepWorkExperience {...props} />;
      case 4: return <StepSkills {...props} />;
      default: return null;
    }
  };

  if (isExisting && !isEditMode && !loading) {
    const fullName = [profileData.firstName, profileData.lastName].filter(Boolean).join(" ") || userName;
    return (
      <DashboardLayout title="Profile" userName={fullName} userRole={userRole}>
        <div className="profile-page">
          {successMsg && <div className="profile-status-msg success" role="status">{successMsg}</div>}
          <div className="profile-step">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700 }}>{fullName}</h2>
                <p style={{ color: "#6B7280", margin: "4px 0 0" }}>{profileData.email}</p>
              </div>
              <button type="button" className="profile-btn-primary" onClick={() => { setIsEditMode(true); setStep(0); }}>
                Edit Profile
              </button>
            </div>
            <div className="profile-grid-3" style={{ gap: 12 }}>
              <div><span style={{ color: "#6B7280", fontSize: "0.8rem" }}>Mobile</span><p style={{ margin: "4px 0 0", fontWeight: 600 }}>{profileData.mobilePrimary || "—"}</p></div>
              <div><span style={{ color: "#6B7280", fontSize: "0.8rem" }}>Gender</span><p style={{ margin: "4px 0 0", fontWeight: 600 }}>{profileData.gender || "—"}</p></div>
              <div><span style={{ color: "#6B7280", fontSize: "0.8rem" }}>Blood Group</span><p style={{ margin: "4px 0 0", fontWeight: 600 }}>{profileData.bloodGroup || "—"}</p></div>
              <div><span style={{ color: "#6B7280", fontSize: "0.8rem" }}>Nationality</span><p style={{ margin: "4px 0 0", fontWeight: 600 }}>{profileData.nationality || "—"}</p></div>
              <div><span style={{ color: "#6B7280", fontSize: "0.8rem" }}>Resumes</span><p style={{ margin: "4px 0 0", fontWeight: 600 }}>{profileData.resumes?.length || 0} file(s)</p></div>
              <div><span style={{ color: "#6B7280", fontSize: "0.8rem" }}>Skills</span><p style={{ margin: "4px 0 0", fontWeight: 600 }}>{profileData.skills?.length || 0} skill(s)</p></div>
            </div>
            {profileData.skills?.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <p style={{ color: "#6B7280", fontSize: "0.8rem", marginBottom: 8 }}>SKILLS</p>
                <div className="profile-skill-tags">
                  {profileData.skills.map((s) => <span key={s} className="profile-skill-tag">{s}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout title="Profile" userName={userName} userRole={userRole}>
        <div style={{ padding: 40, textAlign: "center", color: "#6B7280" }}>Loading profile…</div>
      </DashboardLayout>
    );
  }

  const fullName = [profileData.firstName, profileData.lastName].filter(Boolean).join(" ") || userName;

  return (
    <DashboardLayout title="Profile" userName={fullName} userRole={userRole}>
      <div className="profile-page">
        {error && <div className="profile-status-msg error" role="alert">{error}</div>}
        {successMsg && <div className="profile-status-msg success" role="status">{successMsg}</div>}

        <ProfileStepper currentStep={step} completedSteps={completedSteps} />

        {renderStep()}

        <div className="profile-nav-footer">
          <div className="profile-nav-footer__left">
            {step > 0 && (
              <button type="button" className="profile-btn-secondary" onClick={handleBack} disabled={saving}>
                ← Back
              </button>
            )}
            {isExisting && (
              <button type="button" className="profile-btn-secondary" onClick={() => { setIsEditMode(false); }}>
                Cancel
              </button>
            )}
          </div>
          <div className="profile-nav-footer__right">
            {showErrors && !isStepValid && (
              <span className="profile-validation-hint" role="alert">
                Please fill in all required fields
              </span>
            )}
            <button type="button" className="profile-btn-secondary" onClick={handleSaveDraft} disabled={saving}>
              {saving ? "Saving…" : "Save as Draft"}
            </button>
            {step < STEPS.length - 1 ? (
              <button type="button" className="profile-btn-primary" onClick={handleNext} disabled={saving}>
                Next →
              </button>
            ) : (
              <button type="button" className="profile-btn-primary" onClick={handleSubmit} disabled={saving}>
                {saving ? "Submitting…" : "Submit Profile"}
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

