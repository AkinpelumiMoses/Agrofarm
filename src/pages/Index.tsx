    import { useEffect, useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import ProductsGrids from '@/components/ProductsGrids';
    import Footer from '@/components/Footer';
    import { useAuth } from '@/hooks/useAuth';  
     import Slider from 'react-slick'; 
     import { BadgeCheck } from 'lucide-react';
     import { Leaf, PackageCheck, Smile } from 'lucide-react';







    const Index = () => {
      const [stats, setStats] = useState({ farmers: 0, products: 0, satisfaction: 0 });
      const { user } = useAuth();


      


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

      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
   const heroSlides = [
  {
    image: "/pics/img4.jpg",
    title: "Welcome to AgroFarm",
    text: "Empowering farmers with cutting-edge solutions for a sustainable future.",
  },
  {
    image: "/pics/img2.jpg",
    title: "Harvest Innovation",
    text: "Blending traditional farming wisdom with modern technology.",
  },
  {
    image: "/pics/img3.jpg",
    title: "Grow Smarter with Us",
    text: "From tools to expert advice, we support your agricultural journey.",
  },
];

const heroSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 5000,
  fade: true,
  arrows: false,
  pauseOnHover: false,
};


      return (
    <div className="min-h-screen bg-white flex flex-col">
          {/* Hero Section */}
          {/* <section
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
                Welcome to AgroFarm
              </h1>

              <p className="text-base md:text-lg text-green-200 mb-8 max-w-3xl animate__animated animate__fadeInLeft">
                Welcome to AgroFarm, your gateway to a smarter, more sustainable future in agriculture. We are dedicated to empowering farmers, agribusinesses, and communities through innovative solutions that blend traditional farming wisdom with advanced technology. At AgroFarm, we believe in harvesting not just crops, but a greener and healthier future for all. Explore a greener tomorrow with us — whether you're looking for modern tools, eco-friendly practices, or expert advice, AgroFarm is here to support your journey.
              </p>

              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 mb-6 animate__animated animate__fadeInUp">
                <span className="text-lg mr-2">🚀</span>
                <span className="text-lg">Free shipping on orders over $50</span>
              </div>

          {!user && (
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
    )}


          {user && (
      <div className="flex items-center space-x-4 animate__animated animate__zoomIn">
        <Link to="/product">
          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black">
            View Products
          </Button>
        </Link>
        <span className="relative flex size-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
        </span>
      </div>
    )}
              
            </div>
          </section> */}

 <section className="relative w-full h-screen">
  <Slider {...heroSettings}>
    {heroSlides.map((slide, index) => (
      <div key={index}>
        <div
          className="h-screen w-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center justify-center">
            <div className="text-center px-6 md:px-10 animate__animated animate__fadeIn">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-green-200 max-w-2xl mx-auto mb-8">
                {slide.text}
              </p>

              {/* Buttons */}
              {!user ? (
                <Link to="/signup">
                  <Button className="bg-green-500 hover:bg-green-600 text-black text-sm md:text-base px-6 py-2 rounded-full transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
              ) : (
                <Link to="/productgrid">
                  <Button className="bg-green-500 hover:bg-green-600 text-black text-sm md:text-base px-6 py-2 rounded-full transition-all duration-300">
                    View Products
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    ))}
  </Slider>

  {/* Custom Slick Dots Styling */}
  <style>
    {`
      .slick-dots {
        bottom: 20px;
      }
      .slick-dots li button:before {
        font-size: 12px;
        color: #86efac; /* Tailwind green-300 */
        opacity: 0.75;
      }
      .slick-dots li.slick-active button:before {
        color: #22c55e; /* Tailwind green-500 */
        opacity: 1;
      }
    `}
  </style>
</section>


          {/* Service Highlights Section */}
      <section className="py-20 bg-white animate__animated animate__fadeInUp">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
    <h2 className="text-4xl font-bold text-gray-900 mb-16">Why Choose AgroFarm?</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Card 1 */}
      <div className="p-8 rounded-lg shadow-sm hover:shadow-md border border-gray-200 transition-all">
        <div className="mb-5 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.333 0-4 .667-4 4s2.667 4 4 4 4-.667 4-4-2.667-4-4-4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.243-6.243l-1.414 1.414M6.343 6.343L4.929 4.929m12.728 12.728l1.414 1.414M6.343 17.657l-1.414 1.414" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Eco-Friendly Solutions</h3>
        <p className="text-gray-600">Sustainable farming tools and practices that care for the planet while increasing yield.</p>
      </div>

      {/* Card 2 */}
      <div className="p-8 rounded-lg shadow-sm hover:shadow-md border border-gray-200 transition-all">
        <div className="mb-5 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M16 10h.01M9 16h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h3.5l1 1h4l1-1H17a2 2 0 012 2v12a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">24/7 Customer Support</h3>
        <p className="text-gray-600">Friendly experts available anytime to help you succeed on your agricultural journey.</p>
      </div>

      {/* Card 3 */}
      <div className="p-8 rounded-lg shadow-sm hover:shadow-md border border-gray-200 transition-all">
        <div className="mb-5 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h2l1 2h13l1-2h2M6 14h12v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast & Reliable Delivery</h3>
        <p className="text-gray-600">Count on timely and secure deliveries — right to your farm or business location.</p>
      </div>
    </div>
  </div>
</section>




          {/* Stats Section */}
      <section className="bg-black py-16 animate__animated animate__fadeIn">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
   
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Farmers */}
      <div>
        <div className="flex justify-center mb-4">
          <Leaf className="text-green-500 w-10 h-10" />
        </div>
        <h3 className="text-5xl font-extrabold text-green-400 glow-text">{stats.farmers}+</h3>
        <p className="text-gray-300 mt-3 text-sm uppercase tracking-widest">Happy Farmers</p>
      </div>

      {/* Products */}
      <div>
        <div className="flex justify-center mb-4">
          <PackageCheck className="text-green-500 w-10 h-10" />
        </div>
        <h3 className="text-5xl font-extrabold text-green-400 drop-shadow-lg">{stats.products}+</h3>
        <p className="text-gray-300 mt-3 text-sm uppercase tracking-widest">Products Available</p>
      </div>

      {/* Satisfaction */}
      <div>
        <div className="flex justify-center mb-4">
          <Smile className="text-green-500 w-10 h-10" />
        </div>
        <h3 className="text-5xl font-extrabold text-green-400 drop-shadow-lg">{stats.satisfaction}%</h3>
        <p className="text-gray-300 mt-3 text-sm uppercase tracking-widest">Customer Satisfaction</p>
      </div>
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

<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-12">What Our Clients Say</h2>
    <div className="grid gap-8 md:grid-cols-3">
      {[
        {
          name: 'Amina Yusuf',
          role: 'Farmer, Kaduna',
          text: 'AgroFarm transformed the way I manage my crops. Their eco-friendly tools and customer support are simply top-notch!',
        },
        {
          name: 'Chidi Okeke',
          role: 'Agribusiness Owner, Enugu',
          text: 'I love how fast their delivery is and how knowledgeable their team is. Definitely recommend AgroFarm to every serious farmer.',
        },
        {
          name: 'Fatima Bello',
          role: 'Livestock Farmer, Kano',
          text: 'Thanks to AgroFarm, my livestock are healthier and I save time sourcing quality feed. Their platform is easy and reliable!',
        },
      ].map((testimonial, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6 text-left border border-gray-100 hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp">
          <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
          <div className="flex items-center">
            <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center text-green-600 font-bold mr-3">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center text-gray-900 font-semibold">
                {testimonial.name}
                <BadgeCheck className="h-5 w-5 text-green-500 ml-1" />
              </div>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
        </div>
      ))}
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

          {/* Footer */}
          <Footer />
        </div>
      );
    };

    export default Index;
