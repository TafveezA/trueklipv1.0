
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
      {/* <>
      <nav>
        <ul>
          <li><Link to="/">Producer</Link></li>
          <li><Link to="/customer">Customer</Link></li>
          <li><Link to="/tracking">Tracking</Link></li>
          <li><Link to="/validation">Validation</Link></li>
        </ul>
      </nav>
      </> */}
    <BrowserRouter>
    <Routes>
    <Route path = '/' element ={<Producer />}/>
    <Route path = '/validation' element ={<Validation />}/>
    <Route path = '/customer' element ={<Customer />}/>
    <Route path = '/tracking' element ={<Tracking />}/>
    <Route path = '/marketplace' element ={<Marketplace />}/>
    <Route path = '/ipfs' element ={<IPFS/>}/>
    <Route path = '/minting' element ={<NFTMinting/>}/>
      {/* <Route path = '/branch' element ={<Branch />}/>
      <Route path = '/bankreserve' element ={<BankReserve />}/>
      <Route path = '/banking' element ={<Banking />}/> */}
    </Routes>
    </BrowserRouter>

  </div>
  );
}

export default App;
