import{useEffect, useState} from "react";
import axios from 'axios'
import {Html5QrcodeScanner} from "html5-qrcode"
const abiValidation= require( '../abi')
const Web3 = require("web3");
const ethers = require("ethers");
// const dotenv = require('dotenv')

// dotenv.config({path:'../config/config.env'})
const contractAddressValidation ="0xee48A8762AF6406cB7792D5ef699C9ef555Eef8D"



function Producer() {
    const [scanResult,setScanResult]=useState(null)
    const [klipId, setKlipId] = useState("")
    const [batchNumber, setBatchNumber] = useState("")
    const [mfgDate, setMfgDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [description, setDescription] = useState("")
    const [productAdded, setProductAdded] = useState(false);
    const [kliphash, setKlipHash] = useState("")
    const [arrayData, setArrayData] = useState([]);
   ;
    const [temp, setTemp] = useState("")
    
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

    
      
  async function addProduct() {
    try {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        const accounts = await window.ethereum.enable();
        console.log("accounts", accounts);
        const provider = await new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signer = await provider.getSigner();
        console.log("Signer", signer);
        const address = await signer.getAddress();
        console.log(address);
      } else {
        console.log("MemtaMask Not Installed ");
      }
      const web3eth = new Web3(Web3.givenProvider);

     
      const validation = new web3eth.eth.Contract(abiValidation, contractAddressValidation);

      if (web3eth.givenProvider) {
        console.log("Hello Provider Here", web3eth.givenProvider);
        let address = web3eth.givenProvider.selectedAddress;
        console.log("address", address);

        
        
          let hash = await validation.methods.hashedData(klipId,batchNumber,mfgDate,expiryDate,description).send({ from: address, gas: 1000000 });
          console.log("Response from add product:", hash)
    

          let validateHash = await validation.methods
            .validateHash(klipId,kliphash)
            .call();
           console.log("valid ? /:",validateHash)
          //console.log("call bank:", responseP1)

          let tmp_data = arrayData;
          tmp_data.push(hash)
          console.log(tmp_data)
          setArrayData(tmp_data)
          window.localStorage.setItem("Data", JSON.stringify(tmp_data))
          console.log("arrayData:", arrayData);
 
         
        
      }
    } catch (error) {
      console.log(Error);
    }

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
       <h1>Klip QR Code Scanner</h1>
       {scanResult
       ?<div>success:<a href={apiCall(scanResult)}></a></div>
       :<div id ="reader"></div>
       }
       <div>
        <h1>Testing Blockchain interaction Form</h1>
       <form>
       <fieldset>
         <label>
           <p>Batch Number</p>
           <input name="name" />
         </label>
         <label>
           <p>MFG Date</p>
           <input name="name" />
         </label>
         <label>
           <p>Expiry Date</p>
           <input name="name" />
         </label>
         <label>
           <p>Description</p>
           <input name="name" />
         </label>
     
       </fieldset>
       <button type="submit">Submit</button>
      </form>
       </div>
      </div>



    

    );
  }
  
  export default Producer;
  