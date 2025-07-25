import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProductsGrids from '@/components/ProductsGrids';
import Footer from '@/components/Footer';

const Index = () => {
  const [stats, setStats] = useState({ farmers: 0, products: 0, satisfaction: 0 });

  useEffect(() => {
    let farmersTarget = 1000;
    let productsTarget = 500;
    let satisfactionTarget = 98;

    let farmersCount = 0;
    let productsCount = 0;
    let satisfactionCount = 0;

    const interval = setInterval(() => {
      if (farmersCount < farmersTarget) {
        farmersCount += 20;
      }
      if (productsCount < productsTarget) {
        productsCount += 10;
      }
      if (satisfactionCount < satisfactionTarget) {
        satisfactionCount += 1;
      }

      setStats({
        farmers: Math.min(farmersCount, farmersTarget),
        products: Math.min(productsCount, productsTarget),
        satisfaction: Math.min(satisfactionCount, satisfactionTarget),
      });

      if (
        farmersCount >= farmersTarget &&
        productsCount >= productsTarget &&
        satisfactionCount >= satisfactionTarget
      ) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section
        className="text-white pt-32 pb-48 relative animate-fade-in"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(34,197,94, 0.7)), url('/pics/img3.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate__animated animate__fadeInDown">
            Welcome to Agrofarm
          </h1>

          <p className="text-base md:text-lg text-green-200 mb-8 max-w-3xl animate__animated animate__fadeInLeft">
            Your gateway to a smarter, more sustainable agricultural future. We’re dedicated to empowering farmers, agribusinesses, and communities through innovative solutions that blend traditional farming wisdom with cutting-edge technology. At AgroFarm, we believe in cultivating not just crops, but a thriving, green future for all.
            <br /><br />
            Discover a greener tomorrow with us — whether you're seeking modern tools, eco-friendly practices, or expert advice, AgroFarm is here to support your journey.
          </p>

          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 mb-6 animate__animated animate__fadeInUp">
            <span className="text-lg mr-2">🚀</span>
            <span className="text-lg">Free shipping on orders over $50</span>
          </div>

          <div className="flex items-center space-x-4 animate__animated animate__zoomIn">
            <Link to="/signup">
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black">
                Get Started
              </Button>
            </Link>
            <span className="relative flex size-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
            </span>
          </div>
        </div>
      </section>

      {/* Service Highlights Section */}
      <section className="py-16 bg-white animate__animated animate__fadeInUp">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Why Choose AgroFarm?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Eco-Friendly Solutions 🌿</h3>
              <p className="text-gray-700">Sustainable products and practices that protect the environment while boosting productivity.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-green-700 mb-2">24/7 Customer Support 📞</h3>
              <p className="text-gray-700">Get assistance anytime from our dedicated support team committed to your success.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Fast & Reliable Delivery 🚚</h3>
              <p className="text-gray-700">Timely deliveries to ensure you get what you need, when you need it – every time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-50 py-12 animate__animated animate__fadeIn">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-green-600">{stats.farmers}+</h3>
            <p className="text-gray-700 mt-2">Happy Farmers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-600">{stats.products}+</h3>
            <p className="text-gray-700 mt-2">Products Delivered</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-600">{stats.satisfaction}%</h3>
            <p className="text-gray-700 mt-2">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 animate__animated animate__fadeInUp">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From the field to the barn, discover trusted tools and premium feeds designed to boost your productivity and livestock health.
          </p>
        </div>

        {/* Product Grid Component */}
        <ProductsGrids />
      </section>

      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/09165324219" // Replace with your WhatsApp number
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 flex items-center space-x-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.552 4.094 1.514 5.819L0 24l6.423-1.497A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.05c-2.007 0-3.887-.586-5.478-1.593l-.392-.248-3.81.889.812-3.709-.255-.397A9.962 9.962 0 0 1 2.05 12c0-5.48 4.47-9.95 9.95-9.95 5.48 0 9.95 4.47 9.95 9.95 0 5.48-4.47 9.95-9.95 9.95zm5.377-7.137c-.297-.149-1.755-.867-2.027-.967-.272-.1-.47-.148-.667.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.133-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.52-.074-.148-.667-1.61-.914-2.21-.241-.578-.486-.5-.667-.51l-.57-.01c-.198 0-.52.074-.793.372-.272.297-1.04 1.016-1.04 2.48 0 1.465 1.065 2.875 1.213 3.074.148.198 2.095 3.2 5.08 4.486.709.306 1.262.49 1.693.627.712.227 1.36.195 1.872.119.571-.085 1.755-.717 2.004-1.41.248-.694.248-1.289.173-1.41-.074-.124-.272-.198-.57-.347z" />
        </svg>
        <span className="hidden md:inline text-sm font-medium">Chat with us</span>
      </a>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
