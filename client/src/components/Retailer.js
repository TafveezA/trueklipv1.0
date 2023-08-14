import{useEffect, useState} from "react";
import axios from 'axios'


import { Web3Provider } from "@ethersproject/providers";
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import { abiSupplyChain, abiValidation, contractAddressSupplyChain, contractAddressValidation } from "../constants";


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








function Retailer(){

  
 
    const [klipId, setKlipId] = useState("")
    const [packageSpecification, setPackageSpecification] = useState("")
    const [retailer, setRetailer] = useState("")
    const [description,setDescription] = useState("")
    const [recieveDate,setRecieveDate] =useState("")
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

  async function handleSubmit(){
  try{
  requestAccount()
  const metamaskProvider = new Web3Provider(window.ethereum)
  const signer = metamaskProvider.getSigner()
  const contract = new ethers.Contract(contractAddressSupplyChain,abiSupplyChain,signer)
  const _truklip =1
  const _recievedate = Date.now()
  const _pickdate =Date.now()
  const _orderNo = 1
  const _otherDetails ="other details goes here"
  const _packingbarcode ="packingbarcode details goes here"
  const result = await contract.addRetailerDetails(_truklip,_recievedate,_pickdate,_orderNo,_otherDetails,_packingbarcode)
  console.log(result)

  }catch(error){
    console.log(error.message)

  }
  }


  
  


   
  
    return (
      <div className="App">
      <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-8">
          <h2 className="text-2xl font-bold text-gray-800">Retailer Co</h2>
        </div>
      </header>
       <img className="mx-auto p-2" src={logo} alt="Logo" />
       
      <br></br>
      <h3 class="text-3xl font-bold mt-6">Add Retailer Info</h3>
      <br></br>
      <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
     Add
    </button>
   
     
      </div>



    

    );
      }
  
  export default Retailer;
  