import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api";
import {
  User,
  Mail,
  Lock,
  Calendar,
  Users,
  Stethoscope,
  Award,
  Building2,
  Phone,
} from "lucide-react";
import type { Doctor } from "../../types/models";

export default function DoctorRegistration() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<Omit<Doctor, "created_at">>({
    email: "",
    password: "",
    name: "",
    age: 0,
    gender: "male",
    specialization: "",
    experience: 0,
    designation: "",
    contact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(formData, "doctor");
      sessionStorage.setItem("userEmail", formData.email);
      sessionStorage.setItem("userRole", "doctor");
      navigate("/doctor-dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
      console.error("Registration failed:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value ? Number(value) : 0) : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Stethoscope className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Doctor Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">Join our medical network</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 animate-shake">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4 space-y-6 animate-scale-in"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Age
              </label>
              <input
                type="number"
                name="age"
                required
                value={formData.age || ""}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Stethoscope className="w-4 h-4 mr-2" />
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                required
                value={formData.specialization}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Experience (years)
              </label>
              <input
                type="number"
                name="experience"
                required
                value={formData.experience || ""}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                Designation
              </label>
              <input
                type="text"
                name="designation"
                required
                value={formData.designation}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/auth")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
