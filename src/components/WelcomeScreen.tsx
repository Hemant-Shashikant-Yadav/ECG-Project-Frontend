import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity } from 'lucide-react';
import Layout from './layout/Layout';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-16 h-16 text-red-500 mr-2" />
            <Activity className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">HeartGuard AI</h1>
          <p className="text-xl text-gray-600">Advanced ECG Analysis for Early Heart Disease Detection</p>
        </div>
      </div>
    </Layout>
  );
}