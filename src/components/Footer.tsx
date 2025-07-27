import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo and About */}
        <div className="col-span-1">
          <Link to="/" className="flex items-center mb-4">
            <img src="/pics/logo.png" alt="logo" width="190" />
          </Link>
          <p className="text-sm text-gray-600">
            Your gateway to a smarter, more sustainable agricultural future. We empower farmers and communities with innovative solutions blending traditional wisdom and modern technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-green-500 transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-500 transition">About Us</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-green-500 transition">Services</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-500 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Us</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Email: <a href="mailto:creatifitytechnologiesdigitals@gmail.com" className="hover:text-green-500">creatifitytechnologiesdigitals@gmail.com</a></li>
            <li>Phone: +234- 9165324219</li>
            <li>Address: Apata,Ibadan,Nigeria</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500 transition">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500 transition">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500 transition">
              <Twitter size={20} />
            </a>
            <a href="mailto:creatifitytechnologiesdigital@gmail.com" className="text-gray-600 hover:text-green-500 transition">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://creatiftechnologies.com.ng/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:underline"
        >
          Creatifity Technologies Digital Services
        </a>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
