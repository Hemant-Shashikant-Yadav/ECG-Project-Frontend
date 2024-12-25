import { Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const renderNavLinks = () => {
    if (!user) return null;

    if (user.role === 'patient') {
      return (
        <>
          <Link 
            to="/patient-dashboard" 
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Dashboard
          </Link>
          <Link 
            to="/patient/history" 
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            History
          </Link>
          <Link 
            to="/about" 
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Contact
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Logout
          </button>
        </>
      );
    }

    if (user.role === 'doctor') {
      return (
        <>
          <Link 
            to="/doctor-dashboard" 
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Dashboard
          </Link>
          <Link 
            to="/doctor/patients" 
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Patient Report
          </Link>
          <Link 
            to="/about" 
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Contact
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Logout
          </button>
        </>
      );
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? `/${user.role}-dashboard` : '/'}>
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  HeartGuard AI
                </span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            {renderNavLinks()}
          </div>
        </div>
      </div>
    </nav>
  );
}