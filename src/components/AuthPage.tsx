import { useState } from 'react';
import { Heart } from 'lucide-react';
import Layout from './layout/Layout';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
            alt="Medical"
            className="object-cover h-full w-full opacity-90"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
            </div>

            {isLogin ? (
              <LoginForm onToggleForm={() => setIsLogin(false)} />
            ) : (
              <SignupForm onToggleForm={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}