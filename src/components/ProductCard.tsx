import { Link } from 'react-router-dom';
import { ShoppingCart, Store, Loader2, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <Link to={`/product/${product._id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-gray-50">
          {product.image || product.images?.[0] ? (
            <img
              src={product.image || product.images?.[0]}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <Store className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Quick View Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" className="bg-white text-green-600 hover:text-green-700 shadow-sm">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Stock Row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
            {formatPrice(product.price)}
          </span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              product.stockQuantity > 0
                ? 'bg-green-50 text-green-600'
                : 'bg-red-100 text-red-500'
            }`}
          >
            {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={product.stockQuantity === 0 || isLoading}
          className={`w-full text-white ${
            product.stockQuantity === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
          size="sm"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <ShoppingCart className="h-4 w-4 mr-2" />
          )}
          {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
