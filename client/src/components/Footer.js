
import React from 'react';
import logo from '../logo.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-800 fixed bottom-0 left-0 w-full">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-6 w-6 mr-2" />
        <p className="text-center text-gray-300 text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
