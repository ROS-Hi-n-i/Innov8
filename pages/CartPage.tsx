import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
// Fix: Import ShoppingCartIcon to resolve 'Cannot find name' error.
import { TrashIcon, ShoppingCartIcon } from '../components/Icons';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, checkout } = useAppContext();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length > 0) {
        checkout();
        alert('Thank you for your purchase!');
        navigate('/purchases');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-gray-200">
              {cart.map(item => (
                <li key={item.id} className="py-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3><Link to={`/product/${item.id}`}>{item.title}</Link></h3>
                        <p className="ml-4">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                        <div className="flex">
                            <button onClick={() => removeFromCart(item.id)} className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1">
                                <TrashIcon className="w-4 h-4" /> Remove
                            </button>
                        </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 p-6 rounded-lg border">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                    </div>
                     <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <p className="text-base font-medium text-gray-900">Order total</p>
                        <p className="text-base font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <button onClick={handleCheckout} className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700">
                        Checkout
                    </button>
                </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
          <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">Looks like you haven't added anything to your cart yet.</p>
          <div className="mt-6">
            <Link to="/" className="text-base font-medium text-gray-600 hover:text-gray-500">
              Start Shopping &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;