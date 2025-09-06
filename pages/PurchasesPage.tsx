
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { DollarSignIcon } from '../components/Icons';

const PurchasesPage: React.FC = () => {
  const { purchases } = useAppContext();

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Purchases</h1>
        <p className="mt-1 text-gray-600">A history of all items you've purchased.</p>
      </div>

      {purchases.length > 0 ? (
        <div className="overflow-x-auto">
          <ul className="divide-y divide-gray-200">
            {purchases.map(item => (
                <li key={item.id} className="py-4 flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="text-base font-medium text-gray-900">{item.title}</p>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-base font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    </div>
                </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
            <DollarSignIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">No purchase history</h2>
            <p className="mt-1 text-sm text-gray-500">You haven't made any purchases yet.</p>
            <div className="mt-6">
                <Link to="/" className="text-base font-medium text-green-600 hover:text-green-500">
                Find something to buy &rarr;
                </Link>
            </div>
        </div>
      )}
    </div>
  );
};

export default PurchasesPage;
