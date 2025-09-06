
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LogoIcon, SearchIcon, ShoppingCartIcon, UserIcon, MenuIcon, XIcon, PlusCircleIcon, ListIcon, LogOutIcon, DollarSignIcon } from './Icons';

const Header: React.FC = () => {
  const { currentUser, logout, cart } = useAppContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };
  
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { to: "/", text: "Shop" },
    { to: "/my-listings", text: "My Listings", auth: true },
    { to: "/purchases", text: "My Purchases", auth: true },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-green-600">
              <LogoIcon className="h-8 w-8" />
              <span>EcoFinds</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-8">
            {navLinks.filter(l => !l.auth || currentUser).map(link => (
              <Link key={link.to} to={link.to} className="text-gray-500 hover:text-gray-900 font-medium">{link.text}</Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-500 hover:text-gray-900">
              <ShoppingCartIcon className="h-6 w-6"/>
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalCartItems}</span>
              )}
            </Link>
            {currentUser ? (
              <div className="relative">
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                   <UserIcon className="h-8 w-8 text-gray-600 bg-gray-200 rounded-full p-1" />
                </button>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-semibold">Signed in as</p>
                        <p className="truncate">{currentUser.username}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"><UserIcon className="h-4 w-4 mr-2"/>Dashboard</Link>
                    <Link to="/my-listings" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"><ListIcon className="h-4 w-4 mr-2"/>My Listings</Link>
                    <Link to="/add-product" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"><PlusCircleIcon className="h-4 w-4 mr-2"/>Add Product</Link>
                    <Link to="/purchases" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"><DollarSignIcon className="h-4 w-4 mr-2"/>Purchases</Link>
                    <button onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"><LogOutIcon className="h-4 w-4 mr-2"/>Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="hidden md:inline-block text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md">Login</Link>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.filter(l => !l.auth || currentUser).map(link => (
                  <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">{link.text}</Link>
              ))}
              {!currentUser && (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="text-white bg-green-600 hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium text-center">Login / Sign Up</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
