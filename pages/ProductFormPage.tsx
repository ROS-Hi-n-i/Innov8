
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import { ArrowLeftIcon } from '../components/Icons';

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, currentUser } = useAppContext();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);

  useEffect(() => {
    if (isEditing && id) {
      const productToEdit = products.find(p => p.id === id);
      if (productToEdit && productToEdit.sellerId === currentUser?.id) {
        setTitle(productToEdit.title);
        setDescription(productToEdit.description);
        setPrice(String(productToEdit.price));
        setCategory(productToEdit.category);
      } else {
        // Product not found or user is not the seller, redirect
        navigate('/my-listings');
      }
    }
  }, [id, isEditing, products, navigate, currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      title,
      description,
      price: parseFloat(price),
      category,
    };

    if (isNaN(productData.price) || productData.price <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    if (isEditing && id) {
        const productToEdit = products.find(p => p.id === id);
        if(productToEdit){
            updateProduct({ ...productToEdit, ...productData });
        }
    } else {
      addProduct(productData);
    }
    navigate('/my-listings');
  };

  return (
    <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/my-listings')} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to My Listings
        </button>
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required min="0.01" step="0.01" className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} required className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <p className="text-sm text-gray-600">Image placeholder</p>
                            <p className="text-xs text-gray-500">A random image will be assigned</p>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        {isEditing ? 'Save Changes' : 'Submit Listing'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ProductFormPage;
