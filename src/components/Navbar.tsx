import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCart, Store, Search, Menu, X, User, LogOut, Shield,
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated, isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!API_BASE_URL) {
      console.error('VITE_API_URL is not defined. Set it in your environment variables.');
    }
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim() || !API_BASE_URL) return;

    try {
      setIsSearching(true);
      const response = await fetch(
        `${API_BASE_URL}/products/search?name=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error(`Search failed with status ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error: any) {
      console.error('Search failed:', error);
      alert('Search failed. Please try again later.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setSearchResults([]);
    setSearchTerm('');
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/pics/logo.png" alt="logo" width={190} />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
              onClick={handleSearch}
              aria-label="Search"
            />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {(isSearching || searchResults.length > 0) && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border shadow-md z-50 rounded max-h-60 overflow-y-auto">
                {isSearching ? (
                  <p className="px-4 py-2 text-sm text-gray-500">Searching...</p>
                ) : (
                  searchResults.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => {
                        setSearchTerm('');
                        setSearchResults([]);
                      }}
                    >
                      {product.name}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/productgrid">
              <Button variant="outline" size="sm">Products</Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative">
                  <Button variant="outline" size="sm">
                    <ShoppingCart className="h-4 w-4" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      {user?.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/userprofile')}>
                      <Shield className="h-4 w-4 mr-2" /> Profile
                    </DropdownMenuItem>
                    {isStaff && (
                      <DropdownMenuItem onClick={() => navigate('/staff')}>
                        <Shield className="h-4 w-4 mr-2" /> Staff Dashboard
                      </DropdownMenuItem>
                    )}
                    {isAdmin && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/admin')}>
                          <Shield className="h-4 w-4 mr-2" /> Admin Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/newstaff')}>
                          <Shield className="h-4 w-4 mr-2" /> Create New Staff
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" aria-label="Toggle Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {/* Mobile Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
              onClick={handleSearch}
            />
            {(isSearching || searchResults.length > 0) && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border shadow-md z-50 rounded max-h-60 overflow-y-auto">
                {isSearching ? (
                  <p className="px-4 py-2 text-sm text-gray-500">Searching...</p>
                ) : (
                  searchResults.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => {
                        setSearchTerm('');
                        setSearchResults([]);
                        setIsMenuOpen(false);
                      }}
                    >
                      {product.name}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <Link to="/productgrid">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>Products</Button>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  Cart ({totalItems})
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/userprofile')}>
                Profile
              </Button>
              {isStaff && (
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/staff')}>
                  Staff Dashboard
                </Button>
              )}
              {isAdmin && (
                <>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin')}>
                    Admin Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/newstaff')}>
                    Create New Staff
                  </Button>
                </>
              )}
              <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
