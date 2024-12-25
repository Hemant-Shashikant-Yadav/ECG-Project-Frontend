import type { ECGRecord } from "../../types/models";

interface ECGRecordsListProps {
  records: ECGRecord[];
}

export default function ECGRecordsList({ records }: ECGRecordsListProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        Recent ECG Records
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {records.map((record) => (
            <li key={record.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {record.patientEmail}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Prediction: {record.prediction}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-gray-500">
                      {new Date(record.timestamp).toLocaleDateString()}
                    </p>
                    <a
                      href={record.originalImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      View ECG
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
