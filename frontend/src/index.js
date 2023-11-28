import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';
import reportWebVitals from './reportWebVitals';
import Footer from './components/Footer';
//import IPFS from './components/ipfs';
//import Header from './components/Header';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/>
    <App />
    


   
  
  </React.StrictMode>
);


reportWebVitals();
