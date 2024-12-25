import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import AuthPage from './components/AuthPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientHistory from './pages/PatientHistory';
import Layout from './components/layout/Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/patients" element={
          <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl font-bold mb-6">Patient List</h1>
              {/* Patient list content */}
            </div>
          </Layout>
        } />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/patient/history" element={<PatientHistory />} />
        <Route path="/about" element={
          <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl font-bold mb-6">About Us</h1>
              <p className="text-gray-600">HeartGuard AI is a cutting-edge platform for early heart disease detection using advanced ECG analysis.</p>
            </div>
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
              <p className="text-gray-600">Get in touch with our team for support and inquiries.</p>
            </div>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}