
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon, ShoppingCartIcon, UserIcon } from '../components/Icons';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, users, addToCart, currentUser } = useAppContext();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);
  const seller = product ? users.find(u => u.id === product.sellerId) : null;

  if (!product) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="text-gray-600 hover:underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if(!currentUser) {
        navigate('/auth');
    } else {
        addToCart(product);
        alert(`${product.title} added to cart!`);
    }
  };

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="w-5 h-5" />
        Back to all products
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" style={{minHeight: '400px'}}/>
          </div>
          <div className="md:w-1/2 p-8 flex flex-col">
            <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full self-start">{product.category}</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-4">{product.title}</h1>
            <div className="flex items-center mt-4 text-gray-600">
                <UserIcon className="w-5 h-5 mr-2" />
                <span>Sold by {seller ? seller.username : 'Unknown'}</span>
            </div>
            <p className="text-gray-600 mt-6 text-lg flex-grow">{product.description}</p>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-4xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
              <button
                onClick={handleAddToCart}
                disabled={currentUser?.id === product.sellerId}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCartIcon className="w-5 h-5 mr-2" />
                {currentUser?.id === product.sellerId ? 'Your Listing' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
