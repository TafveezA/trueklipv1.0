import{useEffect, useState} from "react";

//import env from "react-dotenv";

import { Web3Provider } from "@ethersproject/providers";
import { JsonRpcProvider } from "ethers";
// import { Link } from "react-router-dom";
import logo from '../logo.svg';
import { abiValidation, 
  contractAddressValidation,
contractAddressSupplyChain,
abiSupplyChain } from "../constants";



const ethers = require("ethers");
const CryptoJS = require("crypto-js");





const key ="1234"
const jsonPlainText = {
  "name":"tafveez",
  "gmail":"tafveez.eth@gmail.com"
}
const plainText= JSON.stringify(jsonPlainText)
const encrypted = CryptoJS.AES.encrypt(plainText, key);
console.log("encrypted data",encrypted)
console.log("stringify encrypteddata  ",encrypted.toString())
const decrypted = CryptoJS.AES.decrypt(encrypted, key);
console.log("decrypted data",decrypted.toString(CryptoJS.enc.Utf8))
console.log("decrypted JSON data ",JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)))



// const bytes = new decrypted; // Example bytes
// const decoder = new TextDecoder();
// const text = decoder.decode(bytes);

// console.log("Stringify data",text);










function Producer(){

  
 
    const [truklipId, setTruKlipId] = useState("")
    const [batchNumber, setBatchNumber] = useState("")
    const [distributor, setDistributor] = useState("")
    const [description,setDescription] = useState("")
    const [isConsumable, setIsConsumable] = useState(false);
    
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

   async function handleSubmit(){
   
   try{
  requestAccount()
  const metamaskProvider =  new Web3Provider(window.ethereum)
  console.log(metamaskProvider)
  const signer = metamaskProvider.getSigner()
  console.log(signer)
  const contract = new ethers.Contract(contractAddressSupplyChain,abiSupplyChain,signer)
  const _certificate ='x'
  const _batchnumber ='xy'
  const _productionData ='xyz'
  const _otherDetails = 'xy'
  const _producerId =0
  const _truklipId =1;
  const _isConsumable = false;
  const response = await contract.addProduct(_certificate,_batchnumber,_productionData,_otherDetails,_producerId,_truklipId,_isConsumable)

  console.log(response)

   }catch(error){
    console.log(error.message)
   }
   }



async function handleSubmitForUrl(){
  try{
const privateKey = 'de4b0fad5b2956afa383903e4ebcd407d1d6417fdfb977f08c5d5a4a112c199c';
const EOS_RPC_URL='https://api.testnet.evm.eosnetwork.com/';
const provider = new JsonRpcProvider(EOS_RPC_URL, undefined, {
  batchMaxCount: 1
})
const wallet = new ethers.Wallet(privateKey, provider);

const eoscontractAddress = "0x192d2fC734D58fc2864A8E6F33a00361943DefBB" 
const supplyChainContract = new ethers.Contract(eoscontractAddress, abiSupplyChain, wallet);

const _certificate ='x'
const _batchnumber ='xy'
const _productionData ='xyz'
const _otherDetails = 'xy'
const _producerId =0
const _truklipId =1
const _isConsumable = false
const response = await supplyChainContract.addProduct(_certificate,_batchnumber,_productionData,_otherDetails,_producerId,_truklipId,_isConsumable)
console.log(response.toJSON())
  }catch(error){
    console.log(error.message)
  }
}
 
  
 


  

   
  
    return (
 <div className="Producer">
  <header className="bg-white shadow-md">
  <div className="container mx-auto py-4 px-8">
  <h1 className="text-2xl font-bold text-gray-800">Manufacturer Co</h1>
  </div>
  </header>
  <img className="mx-auto p-2" src={logo} alt="Logo" />
       
       <br></br>
       <h3 class="text-3xl font-bold mt-6">Add Manufacturer Info</h3>
      
     
       <br></br> 
    <div>
   
    <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
     AddProduct
    </button>
    <button type="submit" onClick={handleSubmitForUrl} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
     AddProductOnEOS
    </button>
    </div>


   
 </div>



    

    );
      }
  
  export default Producer;
  