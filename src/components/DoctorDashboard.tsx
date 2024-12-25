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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar title="HeartGuard AI - Doctor Portal" />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Doctor Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor your patients' ECG records and analysis
          </p>
        </div>

        <div className="space-y-8 animate-fade-in">
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
