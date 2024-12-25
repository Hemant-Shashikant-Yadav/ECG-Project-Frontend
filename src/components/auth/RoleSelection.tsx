import React from 'react';
import { UserCircle, Stethoscope } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'patient' | 'doctor') => void;
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Choose your role
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <button
              onClick={() => onRoleSelect('patient')}
              className="w-full flex items-center justify-center space-x-3 px-4 py-4 border rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <UserCircle className="w-6 h-6" />
              <span>I'm a Patient</span>
            </button>

            <button
              onClick={() => onRoleSelect('doctor')}
              className="w-full flex items-center justify-center space-x-3 px-4 py-4 border rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Stethoscope className="w-6 h-6" />
              <span>I'm a Doctor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}