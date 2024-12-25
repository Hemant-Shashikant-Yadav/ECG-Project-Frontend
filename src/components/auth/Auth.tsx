import { useState } from "react";
import RoleSelection from "./RoleSelection";
import PatientRegistration from "./PatientRegistration";
import DoctorRegistration from "./DoctorRegistration";
import LoginForm from "./LoginForm";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"patient" | "doctor" | null>(null);

  if (!isLogin && role === null) {
    return <RoleSelection onRoleSelect={setRole} />;
  }

  if (!isLogin && role === "patient") {
    return <PatientRegistration />;
  }

  if (!isLogin && role === "doctor") {
    return <DoctorRegistration />;
  }

  return (
    <LoginForm
      onSignUpClick={() => {
        setIsLogin(false);
        setRole(null);
      }}
    />
  );
}
