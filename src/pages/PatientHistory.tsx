import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import { getECGHistory } from '../lib/db/ecg-records';
import type { ECGRecord } from '../lib/db/ecg-records';

export default function PatientHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState<ECGRecord[]>([]);

  useEffect(() => {
    if (!user) return;

    const loadHistory = async () => {
      const records = await getECGHistory(user.id);
      setHistory(records);
    };

    loadHistory();
  }, [user]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ECG History</h1>
        
        <div className="space-y-6">
          {history.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={record.image_path} 
                    alt={`ECG Record ${record.id}`}
                    className="w-full rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Prediction</dt>
                      <dd className="text-lg font-medium">{record.prediction}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Confidence</dt>
                      <dd className="text-lg font-medium">{record.confidence}%</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Date</dt>
                      <dd className="text-lg font-medium">
                        {new Date(record.created_at).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                  
                  {record.signals && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-2">Signal Data</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {record.signals.map((signal, index) => (
                          <div key={index} className="border rounded p-2">
                            <h5 className="font-medium mb-1">Signal {index + 1}</h5>
                            <div className="max-h-32 overflow-y-auto text-sm">
                              {signal.map((value, i) => (
                                <div key={i} className="text-gray-600">{value.toFixed(4)}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}