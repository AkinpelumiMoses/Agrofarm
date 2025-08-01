import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useCheckout } from '@/hooks/useCheckout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart, isLoading } = useCart();
  const { handleCheckout, isProcessing } = useCheckout();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">You haven't added any items yet.</p>
          <Link to="/productgrid">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          <Button
            onClick={clearCart}
            disabled={isLoading}
            className="text-red-600 border border-red-500 hover:bg-red-50 bg-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 mr-2" />
            )}
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item._id} className="bg-white rounded-xl shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image || item.images?.[0] || `https://via.placeholder.com/100`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || isLoading}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item._id)}
                      disabled={isLoading}
                      className="text-red-600 hover:bg-red-50 mt-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 sticky top-4">
            <Card className="bg-white rounded-xl shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Items ({totalItems})</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleCheckout}
                  disabled={isProcessing || isLoading}
                >
                  {isProcessing ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <ShoppingBag className="h-5 w-5 mr-2" />
                  )}
                  Proceed to Checkout
                </Button>

                <Link to="/productgrid" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
