
export interface CartProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  _id?: string;
  userId: string;
  products: CartProduct[];
  totalPrice: number;
}
