
export enum Category {
  ELECTRONICS = 'Electronics',
  FURNITURE = 'Furniture',
  CLOTHING = 'Clothing',
  BOOKS = 'Books',
  HOME_GOODS = 'Home Goods',
  OTHER = 'Other',
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // Should not be stored long-term in FE state, but needed for mock auth
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  sellerId: string;
}

export interface CartItem extends Product {
  quantity: number;
}
