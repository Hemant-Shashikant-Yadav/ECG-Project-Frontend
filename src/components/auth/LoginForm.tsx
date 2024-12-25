import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { Heart, User, Lock, UserCircle, Stethoscope } from "lucide-react";

interface LoginFormProps {
  onSignUpClick: () => void;
}

export default function LoginForm({ onSignUpClick }: LoginFormProps) {
  const navigate = useNavigate();
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await login(email, password, role);
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userRole", role);
      navigate(role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard");
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Heart className="w-12 h-12 text-blue-600 animate-pulse" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10 animate-scale-in">
          {error && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200 animate-shake">
              <p className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                required
                className="input-field"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("patient")}
                  className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                    role === "patient"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <UserCircle className="w-5 h-5 mr-2" />
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setRole("doctor")}
                  className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                    role === "doctor"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Doctor
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={onSignUpClick}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
