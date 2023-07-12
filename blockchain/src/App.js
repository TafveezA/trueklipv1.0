import logo from './logo.svg';
import './App.css';
import {Html5QrcodeScanner} from "html5-qrcode"
import{useEffect, useState} from "react";


function App() {
  const [scanResult,setScanResult]=useState(null)
  
  useEffect(() =>{
    const scanner = new Html5QrcodeScanner('reader',{
      qrbox:{
        width: 250,
        height:250,
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
 

  return (
    <div className="App">
     <h1>Klip QR code scanner</h1>
     {scanResult
     ?<div>success:<a href={"http://"+scanResult}></a></div>
     :<div id ="reader"></div>
     }
    </div>
  );
}

export default App;
