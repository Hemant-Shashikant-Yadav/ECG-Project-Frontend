import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelection from './RoleSelection';
import PatientRegistration from './PatientRegistration';
import DoctorRegistration from './DoctorRegistration';
import LoginForm from './LoginForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'patient' | 'doctor' | null>(null);
  const navigate = useNavigate();

  if (!isLogin && role === null) {
    return <RoleSelection onRoleSelect={setRole} />;
  }

  if (!isLogin && role === 'patient') {
    return <PatientRegistration />;
  }

  if (!isLogin && role === 'doctor') {
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