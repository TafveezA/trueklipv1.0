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
   
    <button type="submit" onClick={handleSubmit} className="special-button2">
     AddProduct
    </button>
    <button type="submit" onClick={handleSubmitForUrl} className="special-button">
     AddProductOnEOS
    </button>
    </div>

    
  <div class="w-96 h-96 pl-60 pr-72 py-28 bg-white justify-start items-center inline-flex">
  <div class="w-96 h-96 relative">
    <div class="w-12 h-12 left-0 top-0 absolute">
      <div class="w-12 h-12 left-0 top-0 absolute bg-blue-700 rounded-3xl"></div>
      <div class="left-[14px] top-[12px] absolute text-white text-xl font-semibold font-['Inter'] leading-relaxed">01</div>
    </div>
    <div class="w-12 h-12 left-0 top-[180px] absolute">
      <div class="w-12 h-12 left-0 top-0 absolute bg-violet-50 rounded-3xl border border-neutral-200"></div>
      <div class="left-[12px] top-[12px] absolute text-gray-800 text-xl font-semibold font-['Inter'] leading-relaxed">02</div>
    </div>
    <div class="w-12 h-12 left-0 top-[360px] absolute">
      <div class="w-12 h-12 left-0 top-0 absolute bg-violet-50 rounded-3xl border border-neutral-200"></div>
      <div class="left-[12px] top-[12px] absolute text-gray-800 text-xl font-semibold font-['Inter'] leading-relaxed">03</div>
    </div>
    <div class="w-96 h-20 left-[85px] top-0 absolute">
      <div class="left-0 top-0 absolute text-gray-800 text-2xl font-semibold font-['Inter'] leading-loose">Step one title</div>
      <div class="w-96 left-0 top-[40px] absolute text-gray-500 text-base font-medium font-['Inter'] leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at sagittis sapien, eget sodales arcu. Aenean arcu velit, tincidunt ut enim vitae, scelerisque tempus lorem.</div>
    </div>
    <div class="w-96 h-20 left-[85px] top-[180px] absolute">
      <div class="left-0 top-0 absolute text-gray-800 text-2xl font-semibold font-['Inter'] leading-loose">Step two title</div>
      <div class="w-96 left-0 top-[40px] absolute text-gray-500 text-base font-medium font-['Inter'] leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at sagittis sapien, eget sodales arcu. Aenean arcu velit, tincidunt ut enim vitae, scelerisque tempus lorem.</div>
    </div>
    <div class="w-96 h-20 left-[85px] top-[360px] absolute">
      <div class="left-0 top-0 absolute text-gray-800 text-2xl font-semibold font-['Inter'] leading-loose">Step three title</div>
      <div class="w-96 left-0 top-[40px] absolute text-gray-500 text-base font-medium font-['Inter'] leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at sagittis sapien, eget sodales arcu. Aenean arcu velit, tincidunt ut enim vitae, scelerisque tempus lorem.</div>
    </div>
    <div class="w-24 h-px left-[24px] top-[65px] absolute origin-top-left rotate-90 border-2 border-blue-700"></div>
    <div class="w-24 h-px left-[25px] top-[245px] absolute origin-top-left rotate-90 border-2 border-neutral-200"></div>
  </div>
</div>

   
 </div>



    

    );
      }
  
  export default Producer;
  