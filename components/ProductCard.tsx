
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200 flex flex-col h-full">
        <div className="relative w-full aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-green-600">{product.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          <div className="mt-auto pt-4">
            <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
