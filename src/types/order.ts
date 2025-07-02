
export interface OrderProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  products: OrderProduct[];
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'processing';
  createdAt: string;
  updatedAt: string;
}

export interface OrderWithUser {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    role:string;
  };
  products: OrderProduct[];
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'processing';
  createdAt: string;
  updatedAt: string;
}
