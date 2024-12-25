import React from 'react';
import { Heart, Calendar, Clock } from 'lucide-react';

export default function HealthMetrics() {
  return (
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
  );
}