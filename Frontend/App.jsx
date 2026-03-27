import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./src/components/ErrorBoundary";
import SignupEmail from "./src/pages/SignupEmail";
import VerifyOTP from "./src/pages/VerifyOTP";
import CreatePassword from "./src/pages/CreatePassword";
import SignupSuccess from "./src/pages/SignupSuccess";
import Login from "./src/pages/Login";
import Dashboard from "./src/pages/Dashboard";
import MyAspirations from "./src/pages/MyAspirations";
import RoleSelect from "./src/pages/RoleSelect";
import InstituteLogin from "./src/pages/InstituteLogin";
import InstituteRegister from "./src/pages/InstituteRegister";
import InstituteHome from "./src/pages/InstituteHome";
import InstituteOnboarding from "./src/pages/InstituteOnboarding";
import InstituteServices from "./src/pages/InstituteServices";
import InstitutePayments from "./src/pages/InstitutePayments";
import InstitutePlaceholder from "./src/pages/InstitutePlaceholder";
import ForgotPassword from "./src/pages/ForgotPassword";
import Homepage from "./src/figma/My Aspirations/Homepage/Homepage";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/role-select" replace />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/login/student" element={<Login />} />
        <Route path="/login/institute" element={<InstituteLogin />} />
        <Route path="/register/institute" element={<InstituteRegister />} />
        <Route path="/institute/home" element={<InstituteHome />} />
        <Route path="/institute/onboarding" element={<InstituteOnboarding />} />
        <Route path="/institute/services" element={<InstituteServices />} />
        <Route path="/institute/payments" element={<InstitutePayments />} />

        <Route path="/institute/program" element={<InstitutePlaceholder />} />
        <Route path="/institute/students" element={<InstitutePlaceholder />} />
        <Route path="/institute/faculty" element={<InstitutePlaceholder />} />
        <Route path="/institute/venue" element={<InstitutePlaceholder />} />
        <Route path="/institute/campus" element={<InstitutePlaceholder />} />
        <Route path="/institute/dashboard" element={<InstitutePlaceholder />} />
        <Route path="/institute/profile" element={<InstitutePlaceholder />} />
        <Route path="/institute/reports" element={<InstitutePlaceholder />} />
        <Route path="/institute/settings" element={<InstitutePlaceholder />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<CreatePassword />} />
        <Route path="/signup" element={<SignupEmail />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/login" element={<Navigate to="/role-select" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/aspirations" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/role-select" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}