import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '@/components/SignupForm';

const images = [
  '/pics/img3.jpg',
  '/pics/img2.jpg', // Add more images as needed
];

const Signup = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Carousel */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src={images[currentImage]}
          alt="Signup Illustration"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 py-12 bg-white">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/pics/logo.png" alt="Logo" className="h-12 w-auto" />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us and start managing your store
            </p>
          </div>

          {/* Signup Form */}
          <SignupForm />

          {/* Footer */}
        
        </div>
      </div>
    </div>
  );
};

export default Signup;
