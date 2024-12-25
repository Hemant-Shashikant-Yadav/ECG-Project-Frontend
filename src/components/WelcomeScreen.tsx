import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <div className="animate-fade-in text-center">
        <Heart className="w-20 h-20 mb-4 mx-auto text-red-500 animate-pulse" />
        <h1 className="text-4xl font-bold mb-2">HeartGuard AI</h1>
        <p className="text-xl opacity-80">Advanced ECG Analysis & Heart Monitoring</p>
      </div>
    </div>
  );
}