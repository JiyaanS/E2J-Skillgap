import React, { useEffect, useMemo, useState } from "react";
import StartPage from "./StartPage";
import GoalSelection from "./GoalSelection";
import Certifications from "./Certifications";
import {
  getAspirations,
  createAspirations,
} from "../../services/aspirationsService";

const STEPS = [
  { key: "goal", label: "Your Goal", active: true },
  // Removed Certifications step
];

export default function AspirationsFlow() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  // Removed certifications state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { aspirations } = await getAspirations();

        if (!aspirations) {
          setStep(1);
          setGoal("");
          // Removed certifications initialization
          setError(null);
          return;
        }

        setGoal(aspirations.goal || "");
        setCertifications(
          // Removed certifications mapping
        );

        // Set step based on form completion
        if (aspirations.goal) {
          setStep(2); // Adjusted step to skip certifications
        } else {
          setStep(1);
        }

        setError(null);
      } catch (err) {
        console.error(err);
        setError("Unable to load aspirations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const getStepIndex = (currentStep) => {
    if (currentStep === 1 || currentStep === 2) return 0;
    if (currentStep === 3) return 1;
    return 0;
  };

  const stepIndex = getStepIndex(step);

  const stepProgress = useMemo(
    () =>
      STEPS.map((item, index) => ({
        ...item,
        status:
          index < stepIndex
            ? "completed"
            : index === stepIndex
            ? "current"
            : "upcoming",
      })),
    [stepIndex]
  );

  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSaveCertifications = async () => {
    try {
      setLoading(true);
      // Removed certifications from payload

      // Save aspirations
      await createAspirations(payload);
      
      // Show success message
      alert("✓ Your aspirations have been saved successfully!");
      
      // Reset flow to start
      setStep(1);
      setGoal("");
      setCertifications([
        { id: "", name: "", institute: "", validTill: "", file: null },
      ]);
    } catch (err) {
      console.error(err);
      setError("Unable to save your aspirations right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="aspirations">Loading...</div>;
  }

  if (error) {
    return <div className="aspirations">{error}</div>;
  }

  // Show form stages
  return (
    <div className="aspirations">
      <div className="aspirations-header">
        <div className="aspirations-title">My Aspirations</div>
        <div className="aspirations-stepper" aria-label="Progress">
          {stepProgress.map((item, index) => (
            <div
              key={item.key}
              className={`aspirations-step ${item.status}`}
              aria-current={item.status === "current" ? "step" : undefined}
            >
              <div className="aspirations-stepNumber">{index + 1}</div>
              <div className="aspirations-stepLabel">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="aspirations-content">
        {step === 1 && (
          <StartPage onContinue={() => setStep(2)} />
        )}
        {step === 2 && (
          <GoalSelection
            goal={goal}
            setGoal={setGoal}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
        // Removed Certifications component
        )}
      </div>

      {/* Future: AI diagram will be rendered here in future */}
      {/* Future: Profile integration will be added later */}
    </div>
  );
}
