
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useAuth } from './useAuth';
import { useCart } from './useCart';
import { orderApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface PaystackConfig {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
}

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  // You'll need to add your Paystack public key here
  const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_157e2438a37e11ffe958ff20c3718f72b8260ee1';

  const config: PaystackConfig = {
    reference: `order_${Date.now()}`,
    email: user?.email || '',
    amount: Math.round(totalPrice * 100), // Paystack expects amount in kobo (cents)
    publicKey: PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed with checkout.",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
if (user.role ==='staff') {
  try {
     const order =  orderApi.createOrder();
          
          toast({
            title: "Order Created Successfully!",
            description: `Your order has been placed.`,
          });

          // Clear cart after successful order
          clearCart();
          console.log('Order created:', order);
          window.location.href = '/staff'; // Redirect to staff orders page
          
  } catch (error) {
    console.error('Error creating order:', error);
    toast({
      title: "Order Creation Failed",
      description: "There was an issue creating your order. Please contact support.",
      variant: "destructive",
    });

    
  }
     
}
else {
    initializePayment({
      onSuccess: async (response) => {
        console.log('Payment successful:', response);
        
        try {
          // Create order after successful payment
          const order = await orderApi.createOrder();
          
          toast({
            title: "Order Created Successfully!",
            description: `Your order #${order._id} has been placed.`,
          });

          // Clear cart after successful order
          clearCart();
          
          
          
          console.log('Order created:', order);
        } catch (error) {
          console.error('Error creating order:', error);
          toast({
            title: "Payment Successful",
            description: "Payment completed but there was an issue creating your order. Please contact support.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      },
      onClose: () => {
        console.log('Payment dialog closed');
        setIsProcessing(false);
        toast({
          title: "Payment Cancelled",
          description: "You cancelled the payment process.",
        });
      },
    });
  }

  };

  return {
    handleCheckout,
    isProcessing,
  };
};
