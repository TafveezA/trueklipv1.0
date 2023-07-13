
import './App.css';
// import {Html5QrcodeScanner} from "html5-qrcode"
//import{useEffect, useState} from "react";
//import axios from 'axios'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Producer from './components/Producer';
import IPFS from './components/ipfs';
//import fs from'fs';



function App() {
//   const [scanResult,setScanResult]=useState(null)
  
//   useEffect(() =>{
//     const scanner = new Html5QrcodeScanner('reader',{
//       qrbox:{
//         width: 400,
//         height:400,
//       },
//       fps:5,
//     })
//     scanner.render(success,error);
//     function success(result){
//       scanner.clear()
//       setScanResult(result)
//     }
//     function error(){
//      console.warn(error)
//     }

// },[])

// function apiCall(data){
//   const jsonData = JSON.parse(data);
//   const apiUrl = 'http://localhost:5000/api/v1/products/'
//   const requestBody = {
//     name: jsonData.name,
//     quantity:jsonData.quantity,
//     price:jsonData.price,
//     description:jsonData.digitalreciept
//   };

//   axios.post(apiUrl, requestBody)
//   .then((response) => {
//     console.log('Data successfully inserted into the API:', response.data);
//   })
//   .catch((error) => {
//     console.error('Error inserting data into the API:', error.data);
//   });

// }
 

  return (
    <div className="App">
       
    <BrowserRouter>
    <Routes>
    <Route path = '/' element ={<Producer />}/>
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
