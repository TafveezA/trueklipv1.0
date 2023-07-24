import{useEffect, useState} from "react";
import axios from 'axios'
import { Web3Provider } from "@ethersproject/providers";
import {Html5QrcodeScanner} from "html5-qrcode"
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import '../App.css'
import { abiValidation, contractAddressValidation } from "../constants";

//const abiValidation= require( '../abi')
//const Web3 = require("web3");
const ethers = require("ethers");

// const dotenv = require('dotenv')

// dotenv.config({path:'../config/config.env'})
const contractAddress = contractAddressValidation
const abi=abiValidation


function Customer() {

    const [klipId, setKlipId] = useState("")
	const [scanResult,setScanResult]=useState(null)
    // const [batchNumber, setBatchNumber] = useState("")
    // const [mfgDate, setMfgDate] = useState("")
    // const [expiryDate, setExpiryDate] = useState("")
    // const [description, setDescription] = useState("")
    const [valid, setValid] = useState(false);
    const [kliphash, setKlipHash] = useState("")
	const [isButtonVisible, setIsButtonVisible] = useState(true);
    // const [arrayData, setArrayData] = useState([]);
	const [isLoading, setIsLoading] = useState(null);

    const [tracking, setTracking] = useState("")
    
    useEffect(() =>{
		const scanner = new Html5QrcodeScanner('reader',{
			qrbox: {
				width: '400',
				height: '400',
			  },
			  fps: 5,
			})
		scanner.render(success,error);
		function success(result){
		  scanner.clear()
		  setScanResult(result)
		  //addProduct(scanResult)
		}
		function error(){
		 console.warn(error)
		}
	   
  
	},[])

  async function validateByQR(data) {
    try {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log("accounts", accounts);
        const provider = await new Web3Provider(
          window.ethereum
        );
        const signer = await provider.getSigner();
        console.log("Signer", signer);
        const address = await signer.getAddress();
        console.log(address);
      } else {
        console.log("MemtaMask Not Installed ");
      }

      const provider = new Web3Provider(window.ethereum);
      const signer = await provider.getSigner()
      console.log(await signer.getAddress())
      const contract = new ethers.Contract(contractAddress, abi,signer);
	  const fetcheddata =fetchData(data)
	  const jsonData = JSON.parse(data);
      console.log('klipID: ' ,jsonData.klipid)
	  console.log('klipID: ' ,fetcheddata.klipid)
      const hash = await contract.getHashById(jsonData.klipid)

      console.log('hash' , hash)
      const result = await contract.Validate(jsonData.klipid);

      console.log("Valid",result)
    
      //const receipt = await provider.getTransactionReceipt(result.hash);
      //const hash = receipt.logs[0].data;
    
      console.log("Validation Result :", result);
      setValid(result)
      setKlipHash(hash)
	  setIsButtonVisible(false);


     
    } catch (error) {
      console.log(error.message)
    }

  }
  //setKlipId(0)
//validateProduct()

//   function apiCall(data){
//     const jsonData = JSON.parse(data);
//     const apiUrl = 'http://localhost:5000/api/v1/products/'
//     const requestBody = {
// 		klipid: jsonData.klipid,
// 		batchnumber:jsonData.batchnumber,
// 		mfgdate:jsonData.mfgdate,
// 		expirydate:jsonData.expirydate,
// 		mfgdate:jsonData.mfgdate,
// 		warranty:jsonData.warranty,
// 		description:jsonData.description
// 	  };
  
//     axios.post(apiUrl, requestBody)
//     .then((response) => {
//       console.log('Data successfully inserted into the API:', response.data);
//     })
//     .catch((error) => {
//       console.error('Error inserting data into the API:', error.data);
//     });
  
//   }

  async function fetchData(data) {
    try { const jsonData = JSON.parse(data);
        const response = await axios.get('http://localhost:5000/api/v1/products/', {
          params: {
            klipid:jsonData.klipid,
          },
        });
    
        console.log(response.data);
        return response.data
      } catch (error) {
        console.error(error);
      }
  }
  


   
  
    return (
      <div className="App">
   
	   <div> <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-8">
          <h1 className="text-2xl font-bold text-gray-800">Tru Klip QR Code Scanner</h1>
        </div>
      </header></div>
	   <img className="mx-auto p-4" src={logo} alt="Logo" />
       {scanResult
       ?  <div>
       {isLoading ? (
         <p><Link to="/tracking"> Track Product</Link></p>
       ) : (
		<div>{isButtonVisible && (
			<button
			  type="button"
			  onClick={validateByQR(scanResult)}
			  className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
			>
			  Validate Product
			</button>
		  )}
		  </div>
       )}
     </div>
       : 
	   <div id="reader"></div>
	}

	   <div>{isButtonVisible && (<div><h2 className="text-2xl font-bold mb-2">Or</h2>
        <h3 className="text-xl font-bold">Validate Using Klip ID</h3>
		<Link to="/validation"  className="text-blue-500"> Enter Klip ID</Link>
	     </div>)}
		</div>
		<div>{valid ? (<div><h1 className="text-green-500 text-2xl font-semibold">
         Yes Valid Product</h1>
            <p className="text-black-600"> Track the product journey by visiting<Link to="/tracking"  className="text-blue-500"> Track</Link></p>
	     </div>)
		 :(isButtonVisible === false) &&(<div><h1 className="text-red-500 text-2xl font-semibold">
		 oh No Invalid Product
	   </h1> </div>)
	   }
		</div>

       </div>
       
      



    

    );
  }
  
  export default Customer;
  