
import React from 'react';
import logo from '../logo.svg';

const Footer = () => {
  return (
    <footer className="bg-black fixed bottom-0 left-0 w-full border-green-500 border-2">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-6 w-6 mr-2" />
        <p className="text-center text-gray-300 text-sm sm:text-base font-medium">
          &copy; {new Date().getFullYear()} Klip. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
