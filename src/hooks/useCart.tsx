
import { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '@/types/product';
import { cartApi } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
   const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from backend when user is authenticatedAdd commentMore actions
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const cartData = await cartApi.getCart();
      
      // Transform backend cart format to frontend format
      const cartItems = cartData.products?.map((item: any) => ({
        _id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        description: '', // Backend doesn't return description in cart
        category: '', // Backend doesn't return category in cart
        stockQuantity: 0, // Backend doesn't return stock in cart
      })) || [];
      
      setItems(cartItems);
    } catch (error) {
      console.error('Failed to load cart:', error);
      toast({
        title: "Error",
        description: "Failed to load cart from server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity = 1) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await cartApi.addToCart(product._id, quantity);
      
      // Update local state
      setItems(prev => {
        const existingItem = prev.find(item => item._id === product._id);
        if (existingItem) {
          return prev.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity }];
      });

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    try {
      setIsLoading(true);
      await cartApi.removeFromCart(productId);
      
      // Update local state
      setItems(prev => prev.filter(item => item._id !== productId));
      
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
   try {
      setIsLoading(true);
      
      // Calculate the difference to add/remove
      const currentItem = items.find(item => item._id === productId);
      const currentQuantity = currentItem?.quantity || 0;
      const quantityDiff = quantity - currentQuantity;
      
      if (quantityDiff !== 0) {
        await cartApi.addToCart(productId, quantityDiff);
      }
      
      // Update local state
      setItems(prev =>
        prev.map(item =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Failed to update cart:', error);
      toast({
        title: "Error",
        description: "Failed to update cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

   const clearCart = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      await cartApi.clearCart();
      setItems([]);
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isLoading,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
