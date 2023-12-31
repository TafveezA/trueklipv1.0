import React from 'react';
// Assuming the logo is in the same directory as your component
import logo from '../logo.svg';  // Adjust the path accordingly

const Footer = () => {
  return (
    <footer className="background-gradient3">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-6 w-6 mr-2" />
        <p className="text-center text-gray-300 text-sm sm:text-base font-medium">
          &copy; {new Date().getFullYear()} Klip. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

