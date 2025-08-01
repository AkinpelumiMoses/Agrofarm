
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import NewStaff from "./pages/NewStaff";
import ProductGrid from "./components/ProductGrid";
import UserProfile from "./components/UserProfile";
import MyCarousel from "./components/Carousel";
import Staff from "./pages/Staff";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";





const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                 <Route path="/newstaff" element={<NewStaff/>} />
                 <Route path="/productgrid" element={<ProductGrid/>} />
                  <Route path="/userprofile" element={<UserProfile/>} />
                <Route path="/carousel" element={<MyCarousel />} />
                <Route path="/about" element={<AboutUs />} />
                   <Route path="/contact" element={<Contact />} />

                  
                 
                

                <Route path="/admin" element={<Admin />} />
                <Route path="/staff" element={<Staff />} />

                <Route path="*" element={<NotFound />} />
               

              </Routes>
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
