import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePatient } from "../services/api";
import { usePatient } from "../hooks/usePatient";
import type { Patient } from "../types/models";
import Navbar from "./layout/Navbar";
import PatientInfo from "./patient/PatientInfo";
import ECGHistory from "./patient/ECGHistory";
import PatientEditModal from "./PatientEditModal";
import LoadingSpinner from "./common/LoadingSpinner";
import ErrorDisplay from "./common/ErrorDisplay";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { patient, loading, error, setPatient } = usePatient();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!patient) {
    navigate("/auth");
    return null;
  }

  const handleSave = async (updatedPatient: Patient) => {
    try {
      const updated = await updatePatient(updatedPatient.email, updatedPatient);
      setPatient(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update patient:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar title="HeartGuard AI - Patient Portal" />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <PatientInfo patient={patient} onEdit={() => setIsEditing(true)} />
          <ECGHistory />
        </div>
      </main>

      {isEditing && (
        <PatientEditModal
          patient={patient}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
