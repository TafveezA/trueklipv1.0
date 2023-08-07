import React from 'react';
import logo1 from '../asset/careem.jpg'
import logo2 from '../asset/lv.jpg'
import logo3 from '../asset/noon.png'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-8">
          {/* Your logo or site name */}
        
          {/* Add navigation links here */}
        </div>
      </nav>

      {/* Hero Section */}
   <div className="bg-black text-white py-20 px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Blockchain-Powered Supply Chain</h2>
          <p className="text-lg mb-8">Efficient, Transparent,Trackable and Secure</p>
          <button className="bg-green-500 text-white font-bold py-2 px-6 rounded hover:bg-green-600" onClick={<Link to="https://klipit.co/"></Link>}>
            Learn More
          </button>
        </div>
      </div>
    <h4 className="text-2xl font-bold mb-2">Our Partners</h4>
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded shadow-md">
            <img src={logo1} alt="Logo 1" className="w-24 h-24 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Careem</h3>
            <p className="text-gray-700">partnership details....</p>
          </div>
          <div className="bg-white p-8 rounded shadow-md">
            <img src={logo2} alt="Logo 2" className="w-24 h-24 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">LV</h3>
            <p className="text-gray-700">partnership details...</p>
          </div>
          <div className="bg-white p-8 rounded shadow-md">
            <img src={logo3} alt="Logo 3" className="w-24 h-24 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Noon</h3>
            <p className="text-gray-700"> partnership details....</p>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default Home;
