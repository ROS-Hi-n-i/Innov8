
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Product, Category, CartItem } from '../types';
import { MOCK_USERS, MOCK_PRODUCTS } from '../constants';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  products: Product[];
  cart: CartItem[];
  purchases: Product[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (user: Omit<User, 'id'>) => boolean;
  updateUser: (updatedUser: User) => void;
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'imageUrl'>) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  checkout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Product[]>([]);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userToStore } = user;
      setCurrentUser(userToStore);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
  };

  const register = (user: Omit<User, 'id'>): boolean => {
    if (users.some(u => u.email === user.email)) {
      return false; // Email already exists
    }
    const newUser: User = { ...user, id: `user-${Date.now()}` };
    setUsers(prev => [...prev, newUser]);
    const { password: _, ...userToStore } = newUser;
    setCurrentUser(userToStore);
    return true;
  };

  const updateUser = (updatedUser: User) => {
    if(!currentUser || currentUser.id !== updatedUser.id) return;
    setUsers(users.map(u => u.id === updatedUser.id ? {...u, ...updatedUser} : u));
    setCurrentUser(updatedUser);
  };
  
  const addProduct = (productData: Omit<Product, 'id' | 'sellerId' | 'imageUrl'>) => {
    if (!currentUser) return;
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      sellerId: currentUser.id,
      imageUrl: `https://picsum.photos/seed/${Date.now()}/600/400`,
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const deleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
        const existingItem = prev.find(item => item.id === product.id);
        if (existingItem) {
            return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const checkout = () => {
    if (!currentUser) return;
    const newPurchases = cart.map(({quantity, ...product}) => product);
    setPurchases(prev => [...prev, ...newPurchases]);
    const cartProductIds = cart.map(item => item.id);
    setProducts(prev => prev.filter(p => !cartProductIds.includes(p.id)));
    setCart([]);
  };

  const value = {
    currentUser,
    users,
    products,
    cart,
    purchases,
    login,
    logout,
    register,
    updateUser,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    removeFromCart,
    checkout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
