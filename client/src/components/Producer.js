import{useEffect, useState} from "react";
import axios from 'axios'
import {Html5QrcodeScanner} from "html5-qrcode"
//const { JsonRpcProvider } = require("@ethersproject/providers");
import { Web3Provider } from "@ethersproject/providers";
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import { abiValidation, contractAddressValidation } from "../constants";


//import {abiValidation} from "../abi"
// const dotenv =require('dotenv')
// //const Web3 = require("web3");
// require('dotenv').config({path:'../../.env'})
//console.log(process.env.ALCHEMY_API_KEY)
const ethers = require("ethers");
const CryptoJS = require("crypto-js");

const contractAddress =contractAddressValidation
const abi= abiValidation


//console.log(process.env.CONTRACT_VALIDATION_ADDRESS)
const key = "12345";
const plainText = "Hello, world!";
const encrypted = CryptoJS.AES.encrypt(plainText, key);
console.log("encrypted data",encrypted)
const decrypted = CryptoJS.AES.decrypt(encrypted, key);
console.log("decrypted data",decrypted)

function Producer(){

  
    const [scanResult,setScanResult]=useState(null)
     const [klipId, setKlipId] = useState("")
     const [batchNumber, setBatchNumber] = useState("")
    //  const [mfgDate, setMfgDate] = useState("")
    //  const [expiryDate, setExpiryDate] = useState("")
    //  const [description, setDescription] = useState("")
    // const [warranty, setWarranty] = useState("")
     const [isLoading, setIsLoading] = useState(false);
    // const [kliphash, setKlipHash] = useState("")
    // const [arrayData, setArrayData] = useState([]);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
   ;
    //const [temp, setTemp] = useState("")
    
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
        //addProduct(scanResult)
      }
      function error(){
       console.warn(error)
      }
     

  },[])

  async function requestAccount(){
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log("accounts", accounts);
      // const provider = await new ethers.providers.Web3Provider(
      //   window.ethereum
      // );
      // const signer = await provider.getSigner();
      // console.log("Signer", signer);
      // const address = await signer.getAddress();
      // console.log(address);
    } else {
      console.log("MemtaMask Not Installed ");
    }
  
  }
  requestAccount()
  async function addProduct(_dataToBlockchain) {

    try {
      const jsonData = JSON.parse(_dataToBlockchain);
      console.log('jsonData',jsonData)
      console.log('klipid',jsonData.klipid)
      console.log('Batch Number',jsonData.batchnumber)
      console.log('mfg date',jsonData.mfgdate)
      console.log('expirydate',jsonData.expirydate)
      console.log('warranty',jsonData.warranty)
      console.log('description',jsonData.description)
      //apiCall(_data)
      

     
     
      const provider = new Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi,signer);

      // setKlipId(jsonData.klipid)
      // setBatchNumber(jsonData.batchnumber)
      // // const batchNumber=jsonData.batchnumber;
      // // const mfgDate =jsonData.mfgdate;
      // setMfgDate(jsonData.mfgdate)
    
      // setExpiryDate(jsonData.expiryDate)
      // setWarranty(jsonData.warranty)
      // setDescription(jsonData.description)
      const klipId =jsonData.klipid;
      const batchNumber=jsonData.batchnumber;
      const mfgDate =jsonData.mfgdate;
      const expiryDate =jsonData.expirydate;
      const warranty=jsonData.warranty;
      const description=jsonData.description;
   


      const tx = await contract.connect(signer).hashData(klipId, batchNumber, mfgDate, expiryDate, warranty, description);
//       await tx.wait();
    
//       const receipt = await provider.getTransactionReceipt(tx.hash);
//     // const hash = receipt.logs[0].data;


   

// if (typeof receipt.confirmations !== 'undefined') {
//   // Access the confirmations property
//   const confirmations = receipt.confirmations;
//   console.log("Confirmations:", confirmations);
// } else {
//   console.log("Confirmations not available");
// }
    
      console.log("TX Response:", tx.hash);


    }
    
      catch (error) {
      console.log(error.message);
    }

  }

  async function callHashData() {
  try{  // Connect to the Ethereum network
    const provider = new Web3Provider(window.ethereum);
    
    // Specify the contract address and ABI
    const contractAddress = "0x79588896F2e2Dfa46ed290652513CfDa1aa78bF5";
    const abi =[
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_klipId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_batchNumber",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_mfgDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_expiryDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_warranty",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_description",
            "type": "string"
          }
        ],
        "name": "hashData",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_klipId",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "_hashed",
            "type": "bytes32"
          }
        ],
        "name": "getHashById",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "validateHashByKlipId",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    
    const signer = await provider.getSigner();
    // Create a new instance of the contract
    const contract = new ethers.Contract(contractAddress, abi, signer);
  
    // Prepare the parameters for the hashData function
    const klipId =1;
    const batchNumber='XYZ';
    const mfgDate =1;
    const expiryDate =3;
    const warranty=2;
    const description='digitalreceipt';
  
    // Call the hashData function
    const tx = await contract.hashData(klipId, batchNumber, mfgDate, expiryDate, warranty, description);
    await tx.wait();
  
    // Get the transaction receipt to retrieve the hash value
    const receipt = await provider.getTransactionReceipt(tx.hash);
    //const hash = receipt.logs[0].data;
  
    console.log("Reciept:", receipt);
  }catch (error) {
  console.log(error.message);
}
  }
  //callHashData()

  function apiCall(data){
  
    const jsonData = JSON.parse(data);
    const apiUrl = 'http://localhost:5000/api/v1/products/'
    const requestBody = {
      klipid: jsonData.klipid,
      batchnumber:jsonData.batchnumber,
      mfgdate:jsonData.mfgdate,
      expirydate:jsonData.expirydate,
      mfgdate:jsonData.mfgdate,
      warranty:jsonData.warranty,
      description:jsonData.description
    };
  
    axios.post(apiUrl, requestBody)
    .then((response) => {
      console.log('Data successfully inserted into the API:', response.data);
    })
    .catch((error) => {
      console.error('Error inserting data into the API:', error.data);
    });
    addProduct(data)
    setIsLoading(true)
   
  }

  
  


   
  
    return (
      <div className="App">
       <h1 className="text-3xl font-bold underline"> True Klip QR Code Scanner</h1>
       <img className="mx-auto p-4" src={logo} alt="Logo" />
       {scanResult
       ?  <div>
       {isLoading ? (
         <p><Link to="/tracking"> Track Product</Link></p>
       ) : (
         <button type="submit" onClick={() => apiCall(scanResult)}>
           Add Product
         </button>
       )}
     </div>
       :<div id ="reader"></div>
       }
      <br></br>
      <h2 class="text-3xl font-bold mt-6">Add Product</h2>
      <br></br>
       <div><form className="max-w-lg mx-auto">
  <fieldset>
    <div className="mb-4">
      <label htmlFor="klipId" className="text-gray-700 text-lg font-medium">
        Tru KLIP ID
      </label>
      <input
        type="text"
        id="klipId"
        value={klipId}
        onChange={(e) => setKlipId(e.target.value)}
        className="appearance-none bg-gray-100 border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500 w-full"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="klipId" className="text-gray-700 text-lg font-medium">
        Batch Number
      </label>
      <input
        type="text"
        id="klipId"
        value={batchNumber}
        onChange={(e) => setBatchNumber(e.target.value)}
        className="appearance-none bg-gray-100 border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500 w-full"
      />
    </div>
  </fieldset>
  {isButtonVisible && (
        <button
          type="button"
          onClick={callHashData}
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        >
          Validate Product
        </button>
      )}
</form></div>
   
       <div>
        <br></br>
       <button type="submit" onClick={callHashData} className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
       </div>
      </div>



    

    );
      }
  
  export default Producer;
  