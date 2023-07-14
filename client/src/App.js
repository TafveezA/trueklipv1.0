
import './App.css';
// import {Html5QrcodeScanner} from "html5-qrcode"
//import{useEffect, useState} from "react";
//import axios from 'axios'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Producer from './components/Producer';
import Validation from './components/Validation';
import IPFS from './components/ipfs';
//import fs from'fs';



function App() {


  return (
    <div className="App">
       
    <BrowserRouter>
    <Routes>
    <Route path = '/' element ={<Producer />}/>
    <Route path = '/validation' element ={<Validation />}/>
    <Route path = '/ipfs' element ={<IPFS/>}/>
      {/* <Route path = '/branch' element ={<Branch />}/>
      <Route path = '/bankreserve' element ={<BankReserve />}/>
      <Route path = '/banking' element ={<Banking />}/> */}
    </Routes>
    </BrowserRouter>

  </div>
  );
}

export default App;
