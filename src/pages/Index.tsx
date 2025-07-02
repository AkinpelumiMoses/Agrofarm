import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import ProductsGrids from '@/components/ProductsGrids';
import MyCarousel from '@/components/Carousel';
import Footer from '@/components/Footer';




const Index = () => {
  return (
    
    <div className="min-h-screen bg-gray-50">
      <div>
      </div>
      {/* Hero Section */} 
      <div className=" text-white pb-80 pt-40 " style={{ background:"linear-gradient(to right, rgba(0, 0, 0, 1), rgba(34,197, 94, 0.8)), url('public/pics/img3.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      
        <div className="max-w-7xl ms-10 px-4 sm:px-6 lg:px-8 text-start">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse ease-in-out" style={{animationIterationCount:'1'}}>
            Welcome to Agrofarm
          </h1>
          
          <p className='text-base md:text-base text-green-200 mb-8 max-w-3xl'>
            your gateway to a smarter, more sustainable agricultural future. We’re dedicated to empowering farmers, agribusinesses, and communities through innovative solutions that blend traditional farming wisdom with cutting-edge technology. At AgroFarm, we believe in cultivating not just crops, but a thriving, green future for all.

Discover a greener tomorrow with us, where farming meets the future. Whether you're seeking modern tools, eco-friendly practices, or expert advice, AgroFarm is here to support your journey. Join a growing network of forward-thinking growers and agri-enthusiasts who are transforming agriculture — one field at a time.
          </p>
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
            <span className="text-lg">🚀</span>
            <span className="text-lg">Free shipping on orders over $50</span>
          </div>

          <div className='mt-8 flex '>
             <Link to="/signup" className='p-2'>
                  <Button size="sm" className='bg-green-500 hover:bg-green-500 text-black'>Get start</Button>
                </Link>
                <span className="relative flex size-4 mt-2">
  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
  <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
</span>
          </div>
        </div>
        
                
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12"> 
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From the field to the barn, discover trusted tools and premium feeds designed to boost your productivity and livestock health.
          </p>
        </div>

        

        <ProductsGrids />
        <MyCarousel />
  
        

        

      </div>
    <Footer />
    </div>
  );
};

export default Index;
