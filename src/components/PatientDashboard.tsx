import React from 'react';
import { Activity, Heart, Calendar, Clock } from 'lucide-react';

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">HeartGuard AI - Patient Portal</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <Heart className="h-6 w-6 text-red-400" />
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Heart Rate</dt>
                      <dd className="text-3xl font-semibold text-gray-900">72 BPM</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-gray-400" />
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Next Appointment</dt>
                      <dd className="text-lg font-semibold text-gray-900">March 15, 2024</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-gray-400" />
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Last ECG</dt>
                      <dd className="text-lg font-semibold text-gray-900">2 days ago</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Your ECG History</h2>
            <div className="mt-4 bg-white shadow rounded-lg p-6">
              {/* Add ECG history visualization here */}
              <p className="text-gray-500">ECG visualization will be displayed here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}