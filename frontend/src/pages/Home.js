import React from 'react';
import logo1 from '../asset/careem.jpg'
import logo2 from '../asset/lv.jpg'
import logo3 from '../asset/noon.png'
import { Link } from 'react-router-dom';
import './Home.css'
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
   <div className="bg-black text-white border-green-600 border-2 py-20 px-10">
        <div className="w-full h-10 bg-black-200 rounded-md my-4 p-2">
          <h2 className="text-center text-[30px] text-green-400">Blockchain-Powered Supply Chain</h2>
          <p className="text-center font-mono font-extrabold text-[18px]">Efficient, Transparent,Trackable and Secure</p>
        </div>
      </div>
    <div ><h4 className="text-2xl font-bold mb-2 p-4 text-center">Our Partners</h4></div>
    
      <div className="container mx-auto py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="bg-white p-8 rounded shadow-md border-black border-2">
            <img src={logo1} alt="Logo 1" className="w-24 h-24 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center">Careem</h3>
            <p className="text-gray-700 font-medium text-center">partnership details....</p>
          </div>
          <div className="bg-white p-8 rounded shadow-md border-black border-2">
            <img src={logo2} alt="Logo 2" className="w-24 h-24 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center">LV</h3>
            <p className="text-gray-700 font-medium text-center">partnership details...</p>
          </div>
          <div className="bg-white p-8 rounded shadow-md border-black border-2">
            <img src={logo3} alt="Logo 3" className="w-24 h-24 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center">Noon</h3>
            <p className="text-gray-700 font-medium text-center"> partnership details....</p>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default Home;
