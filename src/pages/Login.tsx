

import { Link } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Left Side - Full Image with Overlay */}
     <div className="hidden lg:block w-1/2 relative">
      <img
        src="/pics/img4.jpg"
         alt="Login Illustration"
         className="w-full h-full object-cover"
       />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
     </div>

      {/* Right Side - White Background + White Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 py-12 bg-white">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/pics/logo.png" alt="Logo" className="h-12 w-auto" />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Login to Your Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your dashboard and manage your store
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="text-green-600 hover:text-green-700 font-medium underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

