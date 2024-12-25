import { Heart } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';
  const isPatientRoute = location.pathname.includes('patient');
  const isDoctorRoute = location.pathname.includes('doctor');
  
  const handleLogout = () => {
    navigate('/auth');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">HeartGuard AI</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isWelcomePage && (
              <>
                {isPatientRoute && (
                  <>
                    <Link to="/patient-dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
                    <Link to="/patient/history" className="text-gray-700 hover:text-indigo-600">History</Link>
                  </>
                )}
                {isDoctorRoute && (
                  <>
                    <Link to="/doctor-dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
                    <Link to="/doctor/patients" className="text-gray-700 hover:text-indigo-600">Patients</Link>
                  </>
                )}
                <Link to="/about" className="text-gray-700 hover:text-indigo-600">About Us</Link>
                <Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
