import{useEffect, useState} from "react";
import axios from 'axios'


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
const polygonUrl = process.env.POLYGON_TESTNET_RPC_URL;
console.log(polygonUrl)


const key ="1234"
const plainText = "Hello, world!";
const encrypted = CryptoJS.AES.encrypt(plainText, key);
console.log("encrypted data",encrypted)
const decrypted = CryptoJS.AES.decrypt(encrypted, key);
console.log("decrypted data",decrypted)








function Distributor(){

  
 
    const [klipId, setKlipId] = useState("")
    const [orderNumber, setOrderNumber] = useState("")
    const [retailer, setRetailer] = useState("")
    const [description,setDescription] = useState("")
    const [shipmentDate,setShipmentDate] =useState("")
    //  const [expiryDate, setExpiryDate] = useState("")
    //  const [description, setDescription] = useState("")
    // const [warranty, setWarranty] = useState("")
     const [isLoading, setIsLoading] = useState(false);
    
    const [isButtonVisible, setIsButtonVisible] = useState(false);
   ;
       
    useEffect(() =>{
     
      
     

  },[])

  async function requestAccount(){
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log("accounts", accounts);
   
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
    
      

     
     
      const provider = new Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi,signer);


      const klipId =jsonData.klipid;
      const batchNumber=jsonData.batchnumber;
      const mfgDate =jsonData.mfgdate;
      const expiryDate =jsonData.expirydate;
      const warranty=jsonData.warranty;
      const description=jsonData.description;
   


      const tx = await contract.connect(signer).hashData(klipId, batchNumber, mfgDate, expiryDate, warranty, description);

    
      console.log("TX Response:", tx.hash);


    }
    
      catch (error) {
      console.log(error.message);
    }

  }

  async function callHashData() {
  try{ 
    const provider = new Web3Provider(window.ethereum);
    const signer = await provider.getSigner();  
    const contract = new ethers.Contract(contractAddress, abi, signer);
  

    const klipId =1;
    const batchNumber='XYZ';
    const mfgDate =1;
    const expiryDate =3;
    const warranty=2;
    const description='digitalreceipt';
  

    const tx = await contract.hashData(klipId, batchNumber, mfgDate, expiryDate, warranty, description);
    await tx.wait();
  

    const receipt = await provider.getTransactionReceipt(tx.hash);

  
    console.log("Reciept:", receipt);
  }catch (error) {
  console.log(error.message);
}
  }
  

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
      <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-8">
          <h2 className="text-2xl font-bold text-gray-800">Distributor Co</h2>
        </div>
      </header>
       <img className="mx-auto p-2" src={logo} alt="Logo" />
       
      <br></br>
      <h3 class="text-3xl font-bold mt-6">Add Distributor Info</h3>
      <br></br>
    <div><form  onSubmit={callHashData} className="max-w-lg mx-auto">
    <fieldset>
    <div className="mb-4">
      <label htmlFor="klipId" className="text-gray-700 text-lg font-medium">
        Tru Klip Id
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
      <label htmlFor="batchnumber" className="text-gray-700 text-lg font-medium">
        Order Number
      </label>
      <input
        type="text"
        id="klipId"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        className="appearance-none bg-gray-100 border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500 w-full"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="distributor" className="text-gray-700 text-lg font-medium">
        Retailer Details
      </label>
      <input
        type="text"
        value={retailer}
        onChange={(e) => setRetailer(e.target.value)}
        className="appearance-none bg-gray-100 border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500 w-full"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="shipment date" className="text-gray-700 text-lg font-medium">
        Shipment Date
      </label>
      <input
        type="text"
        value={shipmentDate}
        onChange={(e) => setShipmentDate(e.target.value)}
        className="appearance-none bg-gray-100 border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500 w-full"
      />
    </div>

  </fieldset>
  <div>
       
       <button type="submit" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
</div>
</form></div>
   
     
      </div>



    

    );
      }
  
  export default Distributor;
  