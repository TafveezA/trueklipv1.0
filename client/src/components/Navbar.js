import React, { useState } from 'react';
import logo from '../logo.svg';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
          <a href="/" className="text-white font-bold text-lg">
  <img src={logo} alt="Logo" className="h-10 w-10" />
</a>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-400 hover:text-white focus:outline-none focus:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          <div className={`hidden md:block ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="ml-4 md:ml-10 flex items-baseline space-x-4">
              <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home/Retailer</a>
              <a href="/tracking" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tracking</a>
              <a href="/customer" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Customer</a>
              <a href="/validation" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Validation</a>
              <a href="/marketplace" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Marketplace</a>
            </div>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Retailer</a>
          <a href="/tracking" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Tracking</a>
          <a href="/customer" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Customer</a>
          <a href="/validation" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Validation</a>
          <a href="/marketplace" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Marketplace</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
