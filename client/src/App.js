

// import {Html5QrcodeScanner} from "html5-qrcode"
//import{useEffect, useState} from "react";
//import axios from 'axios'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Producer from './components/Producer';
import Validation from './components/Validation';
import IPFS from './components/ipfs';
import Customer from './components/Customer';
import Tracking from './components/Tracking';
import Marketplace from './components/Marketplace';
import NFTMinting from './components/NFTMinting';
import Distributor from "./components/Distributor";
import Retailer from "./components/Retailer";
import Home from "./components/Home";
//import LoginPage from './components/LoginPage';
//import Callback from './components/CallBack';
//import CallBack from './components/CallBack';
//import Admin from './components/Admin';






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
    
    


    {/* <Route path="/login" element={<LoginPage/>} />
    <Route path="/auth/google/callback" element={<CallBack/>} /> */}
    {/* <Route path="/admin" element={<Admin/>}/> */}
    </Routes>
    </BrowserRouter>

  </div>
  );
}

export default App;
