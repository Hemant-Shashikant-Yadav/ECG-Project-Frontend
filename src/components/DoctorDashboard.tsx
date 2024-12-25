import React from "react";
import { useECGStats } from "../hooks/useECGStats";
import Navbar from "./layout/Navbar";
import DashboardStats from "./doctor/DashboardStats";
import ECGRecordsList from "./doctor/ECGRecordsList";
import LoadingSpinner from "./common/LoadingSpinner";
import ErrorDisplay from "./common/ErrorDisplay";

export default function DoctorDashboard() {
  const { records, uniquePatients, totalRecords, loading, error } =
    useECGStats();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar title="HeartGuard AI - Doctor Portal" />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <DashboardStats
            uniquePatients={uniquePatients}
            totalRecords={totalRecords}
          />
          <ECGRecordsList records={records} />
        </div>
      </main>
    </div>
  );
}
