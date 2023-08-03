
import './App.css';
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



//import fs from'fs';


//console.log(process.env)

function App() {


  return (
    <div className="App">
   
    <BrowserRouter>
    <Routes>
    <Route path = '/' element ={<Producer />}/>
    <Route path = '/validation' element ={<Validation />}/>
    <Route path = '/customer' element ={<Customer />}/>
    <Route path = '/tracking' element ={<Tracking />}/>
    <Route path = '/marketplace' element ={<Marketplace />}/>
    <Route path = '/ipfs' element ={<IPFS/>}/>
    <Route path = '/minting' element ={<NFTMinting/>}/>


    
    </Routes>
    </BrowserRouter>

  </div>
  );
}

export default App;
