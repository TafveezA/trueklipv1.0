

// import {Html5QrcodeScanner} from "html5-qrcode"
//import{useEffect, useState} from "react";
//import axios from 'axios'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Producer from './pages/Producer';
import Validation from './pages/Validation';
import IPFS from './pages/ipfs';
import Customer from './pages/Customer';
import Tracking from './pages/Tracking';
import Marketplace from './pages/Marketplace';
import NFTMinting from './pages/NFTMinting';
import Distributor from "./pages/Distributor";
import Retailer from "./pages/Retailer";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Navbar } from "./components";
// import Footer from "./components/Footer";







//console.log(process.env)

function App() {


  return (
    <div className="App">
   
    <BrowserRouter>
    <Routes>
    <Route path = '/' element ={<Home />}/>
    <Route path = '/validation' element ={<Validation />}/>
    <Route path = '/customer' element ={<Customer />}/>
    <Route path = '/tracking' element ={<Tracking />}/>
    <Route path = '/marketplace' element ={<Marketplace />}/>
    <Route path = '/ipfs' element ={<IPFS/>}/>
    <Route path = '/minting' element ={<NFTMinting/>}/>
    <Route path = '/manufacturer' element ={<Producer/>}/>
    <Route path = '/distributor' element ={<Distributor/>}/>
    <Route path = '/retailer' element ={<Retailer/>}/>
    {/* <Route path = '/forex' element ={<ForexApp/>}/> */}
    
    
    


    {/* <Route path="/login" element={<LoginPage/>} />
    <Route path="/auth/google/callback" element={<CallBack/>} /> */}
    {/* <Route path="/admin" element={<Admin/>}/> */}
    </Routes>
    </BrowserRouter>
    {/* <div><Navbar/></div> */}
  </div>


  );
}

export default App;
