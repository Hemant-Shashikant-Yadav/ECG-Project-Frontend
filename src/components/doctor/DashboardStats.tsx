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
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-blue-500" />
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Patients
                </dt>
                <dd className="text-3xl font-semibold text-gray-900">
                  {uniquePatients}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-green-500" />
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total ECG Records
                </dt>
                <dd className="text-3xl font-semibold text-gray-900">
                  {totalRecords}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-purple-500" />
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Avg Records/Patient
                </dt>
                <dd className="text-3xl font-semibold text-gray-900">
                  {uniquePatients
                    ? (totalRecords / uniquePatients).toFixed(1)
                    : "0"}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
