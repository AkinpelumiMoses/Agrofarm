import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const Contact = () => {
       const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      {/* Hero Section with Background Image */}
      <section className="relative h-72 bg-cover bg-center" style={{ backgroundImage: 'url(pics/contact.jpg)' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center animate-fadeIn">
            Get in Touch
          </h1>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-white dark:bg-gray-950 flex-grow">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start animate-fadeUp">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
                Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Reach out to us for inquiries, support, or collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="text-green-500" />
                <span className="text-gray-800 dark:text-gray-200">+234 9165324219</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-green-500" />
                <span className="text-gray-800 dark:text-gray-200">info@agrofarm.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-green-500 mt-1" />
                <span className="text-gray-800 dark:text-gray-200">
                  123 Agro Street, Lagos, Nigeria
                </span>
              </div>
            </div>

            <div className="mt-8 rounded-lg overflow-hidden border border-green-100 dark:border-green-900 shadow-md">
              <iframe
                title="AgroFarm Location"
                className="w-full h-64"
                src="https://maps.google.com/maps?q=Lagos%2C%20Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg border dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-green-600">Send a Message</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  rows={5}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Submit Message
              </Button>
            </form>
          </div>
        </div>
      </section>

                  {/* WhatsApp Chat Button */}
          <a
            href="https://wa.me/09165324219"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 flex items-center space-x-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.552 4.094 1.514 5.819L0 24l6.423-1.497A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.05c-2.007 0-3.887-.586-5.478-1.593l-.392-.248-3.81.889.812-3.709-.255-.397A9.962 9.962 0 0 1 2.05 12c0-5.48 4.47-9.95 9.95-9.95 5.48 0 9.95 4.47 9.95 9.95 0 5.48-4.47 9.95-9.95 9.95zm5.377-7.137c-.297-.149-1.755-.867-2.027-.967-.272-.1-.47-.148-.667.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.133-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.52-.074-.148-.667-1.61-.914-2.21-.241-.578-.486-.5-.667-.51l-.57-.01c-.198 0-.52.074-.793.372-.272.297-1.04 1.016-1.04 2.48 0 1.465 1.065 2.875 1.213 3.074.148.198 2.095 3.2 5.08 4.486.709.306 1.262.49 1.693.627.712.227 1.36.195 1.872.119.571-.085 1.755-.717 2.004-1.41.248-.694.248-1.289.173-1.41-.074-.124-.272-.198-.57-.347z" />
            </svg>
            <span className="hidden md:inline text-sm font-medium">Chat with us</span>
          </a>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
      <Footer />
    </div>
  );
};

export default Contact;
