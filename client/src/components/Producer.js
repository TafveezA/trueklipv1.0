import{useEffect, useState} from "react";
import axios from 'axios'
//import env from "react-dotenv";

import { Web3Provider } from "@ethersproject/providers";
// import { Link } from "react-router-dom";
import logo from '../logo.svg';
import { abiValidation, 
  contractAddressValidation,
contractAddressSupplyChain,
abiSupplyChain } from "../constants";



//import {abiValidation} from "../abi"
// const dotenv =require('dotenv')
// //const Web3 = require("web3");
// require('dotenv').config({path:'../../.env'})
//console.log(process.env.ALCHEMY_API_KEY)
const ethers = require("ethers");
const CryptoJS = require("crypto-js");

const contractAddress =contractAddressValidation
const abi= abiValidation
//const polygonUrl = env.POLYGON_TESTNET_RPC_URL;



const key ="1234"
const plainText = "Hello, world!";
const encrypted = CryptoJS.AES.encrypt(plainText, key);
console.log("encrypted data",encrypted)
const decrypted = CryptoJS.AES.decrypt(encrypted, key);
console.log("decrypted data",decrypted)

const privateKey = 'de4b0fad5b2956afa383903e4ebcd407d1d6417fdfb977f08c5d5a4a112c199c';

const provider = new ethers.JsonRpcProvider('https://api.testnet.evm.eosnetwork.com/');
const wallet = new ethers.Wallet(privateKey, provider);

const supplyChainContract = new ethers.Contract(contractAddressSupplyChain, abiSupplyChain, wallet);







function Producer(){

  
 
    const [truklipId, setTruKlipId] = useState("")
    const [batchNumber, setBatchNumber] = useState("")
    const [distributor, setDistributor] = useState("")
    const [description,setDescription] = useState("")
 

     const [isLoading, setIsLoading] = useState(false);
    
    const [isButtonVisible, setIsButtonVisible] = useState(false);

       
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

  const handleChange = (e) => {
    setTruKlipId(e.target.value)
   }
   const handleIdChange = (e) => {
    setBatchNumber(e.target.value)
   }
   const handleDescriptionChange = (e) => {
     setDescription(e.target.value)
    }
 

 
   const handleSubmit = async(e) => {
     e.preventDefault();
     
     if (window.ethereum !== "undefined"){
         const accounts = await window.ethereum.request({method:'eth_requestAccounts'})
         console.log("accounts",accounts[0])
     }

    
  
   try {
    requestAccount()
     const provider = new Web3Provider(window.ethereum)
     const signer = await provider.getSigner()
     const address=await signer.getAddress()
     console.log(await signer.getAddress())
     const contract = new ethers.Contract(supplyChainContract, abiSupplyChain,signer)
     const _certificate = 'x';
     const _batchNumber = 'x';
     const _productionData = 'x';
     const _otherDetails = 'x';
     const _producerId = 0; // Replace with the producer ID
     const _truklipId = 1; // Replace with the truklip ID
     const _isConsumable = true;
     const tx = await contract.addProduct(
      _certificate,
      _batchNumber,
      _productionData,
      _otherDetails,
      _producerId,
      _truklipId,
      _isConsumable
  );

  await tx.wait();
  console.log('Transaction complete:', tx.hash,address);


   } catch (error) {
     console.log('Error uploading file: ', error)
   } 

   }
 

 
  
 
  async function callHashData() {
  
  try{ 

 
    const _certificate = 'Certificate Example';
    const _batchNumber = 'Batch123';
    const _productionData = 'Production Data';
    const _otherDetails = 'Other Details';
    const _producerId = 1; // Replace with the producer ID
    const _truklipId = 1; // Replace with the truklip ID
    const _isConsumable = true;

    const tx = await supplyChainContract.addProduct(
        _certificate,
        _batchNumber,
        _productionData,
        _otherDetails,
        _producerId,
        _truklipId,
        _isConsumable
    );

    await tx.wait();
    console.log('Transaction complete:', tx.hash);
  }catch (error) {
  console.log(error.message);
}
  }
  

  

   
  
    return (
      <div className="Producer">
          <header className="bg-white shadow-md">
          <div className="container mx-auto py-4 px-8">
          <h1 className="text-2xl font-bold text-gray-800">Manufacturer Co</h1>
        </div>
      </header>
       <img className="mx-auto p-4" src={logo} alt="Logo" />
       
    
      <h2 class="text-3xl font-bold mt-6">Add Product Info</h2>
      
<div>
<form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="productname" className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="productname"
            name="productname"
            value={truklipId}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            
          />
        </div>
        <div className="mb-4">
          <label htmlFor="truklipid" className="block text-gray-700 font-medium mb-2">
            TruKlipId
          </label>
          <input
            type="text"
            id="trueklipid"
            name="trueklipid"
            value={batchNumber}
            onChange={handleIdChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            
          />
        </div>
      
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full resize-none focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
            
          />
        </div>
      
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          Submit
        </button>
      </form>
</div>
   
      </div>



    

    );
      }
  
  export default Producer;
  