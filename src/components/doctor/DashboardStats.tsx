import { Users, Activity, FileText } from "lucide-react";

interface DashboardStatsProps {
  uniquePatients: number;
  totalRecords: number;
}

export default function DashboardStats({
  uniquePatients,
  totalRecords,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="card p-6 transform hover:scale-105 transition-all duration-200">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-blue-100">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Patients
              </dt>
              <dd className="text-3xl font-bold text-gray-900 animate-fade-in">
                {uniquePatients}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="card p-6 transform hover:scale-105 transition-all duration-200">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-green-100">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total ECG Records
              </dt>
              <dd className="text-3xl font-bold text-gray-900 animate-fade-in">
                {totalRecords}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="card p-6 transform hover:scale-105 transition-all duration-200">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-purple-100">
            <Activity className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Avg Records/Patient
              </dt>
              <dd className="text-3xl font-bold text-gray-900 animate-fade-in">
                {uniquePatients
                  ? (totalRecords / uniquePatients).toFixed(1)
                  : "0"}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
