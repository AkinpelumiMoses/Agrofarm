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

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16 animate__animated animate__fadeInUp">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 animate__animated animate__fadeInDown">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeInLeft">
              <p className="text-gray-700 italic">"Agrofarm transformed our yield and made farming enjoyable again. Highly recommend their tools and support!"</p>
              <p className="mt-4 font-semibold text-green-600">- Farmer Adebayo</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp">
              <p className="text-gray-700 italic">"Excellent customer service and quality products. My livestock are healthier than ever!"</p>
              <p className="mt-4 font-semibold text-green-600">- Grace Oluchi</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeInRight">
              <p className="text-gray-700 italic">"A game-changer for modern farming. I love how easy it is to get what I need from Agrofarm."</p>
              <p className="mt-4 font-semibold text-green-600">- John Okoro</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
