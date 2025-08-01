import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf, Globe, Handshake, BadgeCheck } from 'lucide-react';
import Footer from '@/components/Footer';

const AboutUs = () => {
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center flex items-center justify-center animate__animated animate__fadeIn"
        style={{ backgroundImage: "url('/pics/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-xl">
            About AgroFarm
          </h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white animate__animated animate__fadeInUp">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            At AgroFarm, we aim to empower farmers, agribusinesses, and communities by blending agricultural wisdom with cutting-edge innovation. Our goal is to support your growth toward a greener and more productive future.
          </p>
          <Leaf className="w-12 h-12 mx-auto text-green-500" />
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-green-50 animate__animated animate__fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img src="/pics/teamwork.jpg" alt="Our Team in Action" className="rounded-lg shadow-lg w-full" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              AgroFarm is a collective of passionate agricultural professionals, technologists, and innovators. We are dedicated to making agriculture more efficient, sustainable, and profitable through our diverse experience and forward-thinking mindset.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our vision is to bridge the gap between tradition and technology — delivering reliable tools, expert knowledge, and unwavering support directly to your farm.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white animate__animated animate__fadeInUp">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid gap-10 md:grid-cols-3 text-left">
            {/* Card 1 */}
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg border transition-transform duration-300 transform hover:-translate-y-1">
              <Globe className="text-green-500 w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h3>
              <p className="text-gray-600">We promote eco-friendly practices that protect the environment while enhancing productivity.</p>
            </div>
            {/* Card 2 */}
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg border transition-transform duration-300 transform hover:-translate-y-1">
              <Handshake className="text-green-500 w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-600">Our work uplifts farmers and rural communities through access, education, and empowerment.</p>
            </div>
            {/* Card 3 */}
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg border transition-transform duration-300 transform hover:-translate-y-1">
              <Leaf className="text-green-500 w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600">We embrace technology and creativity to bring smarter, scalable solutions to agriculture.</p>
            </div>
          </div>
        </div>
      </section>

 {/* Meet the Team */}
<section className="relative py-24 bg-gradient-to-b from-green-50 via-white to-white">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
    <h2 className="text-4xl md:text-3xl font-bold text-gray-900 mb-4">Meet the AgroFarm Team</h2>
    <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
      Passionate, experienced, and committed to transforming agriculture with technology and care.
    </p>

    <div className="grid gap-12 md:grid-cols-3">
      {[
        { name: 'Akinpelumi Moses', role: 'CEO & Founder', image: '/pics/akin.jpg' },
        { name: 'Grace Okechukwu', role: 'Head of Operations', image: '/pics/grace.jpg' },
        { name: 'Samuel Abubakar', role: 'Lead Agronomist', image: '/pics/samuel.jpg' },
      ].map((member, index) => (
        <div
          key={index}
          className="relative bg-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-green-200 mb-4">
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>





      {/* Call to Action */}
      <section className="py-16 bg-white text-center animate__animated animate__fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Grow with Us?</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed">
          Join thousands of farmers and businesses using AgroFarm to cultivate success with smarter, greener farming.
        </p>
        <Link to="/contact">
          <Button className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-full transition-all duration-300">
            Contact Us
          </Button>
        </Link>
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
