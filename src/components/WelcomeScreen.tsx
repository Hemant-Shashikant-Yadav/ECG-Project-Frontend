import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex flex-col items-center justify-center text-white px-4">
      <div className="animate-fade-in text-center max-w-md mx-auto">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-red-500 rounded-full animate-pulse-slow opacity-50 blur-xl"></div>
          </div>
          <Heart className="w-24 h-24 mb-6 mx-auto text-red-500 relative z-10 animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
          HeartGuard AI
        </h1>
        <p className="text-xl text-blue-100 opacity-90 font-light">
          Advanced ECG Analysis & Heart Monitoring
        </p>
        <div className="mt-8 w-16 h-1 bg-blue-400 mx-auto rounded-full opacity-75"></div>
      </div>
    </div>
  );
}
