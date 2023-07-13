import{useEffect, useState} from "react";
import axios from 'axios'
import {Html5QrcodeScanner} from "html5-qrcode"
//const Web3 = require("web3");
//const ethers = require("ethers");


function Producer() {
    const [scanResult,setScanResult]=useState(null)
    
    useEffect(() =>{
      const scanner = new Html5QrcodeScanner('reader',{
        qrbox:{
          width: 400,
          height:400,
        },
        fps:5,
      })
      scanner.render(success,error);
      function success(result){
        scanner.clear()
        setScanResult(result)
      }
      function error(){
       console.warn(error)
      }
  
  },[])
  
  function apiCall(data){
    const jsonData = JSON.parse(data);
    const apiUrl = 'http://localhost:5000/api/v1/products/'
    const requestBody = {
      name: jsonData.name,
      quantity:jsonData.quantity,
      price:jsonData.price,
      description:jsonData.digitalreciept
    };
  
    axios.post(apiUrl, requestBody)
    .then((response) => {
      console.log('Data successfully inserted into the API:', response.data);
    })
    .catch((error) => {
      console.error('Error inserting data into the API:', error.data);
    });
  
  }
   
  
    return (
      <div className="App">
       <h1>Klip QR code scanner</h1>
       {scanResult
       ?<div>success:<a href={apiCall(scanResult)}></a></div>
       :<div id ="reader"></div>
       }
      </div>
    );
  }
  
  export default Producer;
  