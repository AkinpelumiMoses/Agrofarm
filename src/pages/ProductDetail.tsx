import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/services/api';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductById(id!),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-center text-gray-400 text-lg">
          Loading product details...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Product not found
          </h3>
          <p className="text-gray-600 mb-4">
            The product you're looking for does not exist.
          </p>
          <Link to="/productgrid">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/productgrid" className="text-green-600 hover:text-green-700 mb-6 inline-flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6 items-center">
          {/* Image Section */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={product.image || product.images?.[0] || `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80`}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* Optional: Stock Badge */}
            <span className={`absolute top-4 left-4 px-3 py-1 text-sm font-semibold rounded-full ${
              product.stockQuantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
            }`}>
              {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
        

            <p className="text-lg text-gray-700">{product.description}</p>

            {/* Price & Category */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">
                {formatPrice(product.price)}
              </div>
              {product.oldPrice && (
                <div className="text-gray-500 line-through">
                  {formatPrice(product.oldPrice)}
                </div>
              )}
              {product.category && (
                <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mt-2">
                  {product.category}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
              className={`mt-4 w-full text-white text-lg py-3 ${
                product.stockQuantity > 0
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
