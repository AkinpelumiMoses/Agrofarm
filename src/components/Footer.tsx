import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-16 pb-8 mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand & Description */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <img src="/pics/logo.png" alt="logo" width="180" className="hover:opacity-90 transition duration-300" />
          </Link>
          <p className="text-sm leading-relaxed text-gray-600">
            AgroFarm empowers farmers and communities with smart, sustainable solutions that bridge traditional farming and modern technology.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-600 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-green-600 transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-green-600 transition">Services</Link></li>
            <li><Link to="/contact" className="hover:text-green-600 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:creatifitytechnologiesdigitals@gmail.com" className="hover:text-green-600 transition">creatifitytechnologiesdigitals@gmail.com</a></li>
            <li>Phone: +234-916-532-4219</li>
            <li>Location: Apata, Ibadan, Nigeria</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect with Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition">
              <Facebook size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition">
              <Instagram size={22} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition">
              <Twitter size={22} />
            </a>
            <a href="mailto:creatifitytechnologiesdigital@gmail.com" className="text-gray-600 hover:text-green-600 transition">
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://creatiftechnologies.com.ng/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline transition"
        >
          Creatifity Technologies Digital Services
        </a>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
