import{useEffect, useState} from "react";

//import env from "react-dotenv";

import { Web3Provider } from "@ethersproject/providers";
import { JsonRpcProvider } from "ethers";
// import { Link } from "react-router-dom";
//import logo from '../assets/logo.svg';
import overview from '../assets/overview.png'
import settings from '../assets/settings.png'
import articles from '../assets/articles.png'
import contacts from '../assets/contacts.png'
import ideas from '../assets/ideas.png'
import subscription from '../assets/subscription.png'
import agents from '../assets/agents.png'
import tickets from '../assets/tickets.png'
import search from '../assets/search.png'
import header from '../assets/header.png'
import icon from '../assets/icon.png';
import sheet from '../assets/sheet.png'
import graph from '../assets/graph.png'
import ygraph from '../assets/ygraph.png'

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
  
  
 <div className="w-96 h-96 relative bg-zinc-700">
  
  <div className="w-96 h-96 relative">
 
  <div className="w-[1122px] h-[546px] left-[418px] top-[280px] absolute justify-center items-center inline-flex">
  <div className="w-[1122px] h-[546px] bg-white rounded-lg border border-zinc-300" />
  <div className="w-96 left-[32px] top-[34px] absolute text-gray-800 text-lg font-bold font-['Mulish'] tracking-wide">Today’s trends</div>
  <div className="w-96 h-4 left-[32px] top-[64px] absolute text-gray-400 text-xs font-normal font-['Mulish'] leading-none tracking-tight">as of 25 May 2019, 09:41 PM</div>
  </div>
  
  
  <div className="w-44 h-4 left-[900px] top-[64px] absolute">
    <div className="w-14 h-4 left-0 top-60 absolute">
      <div className="w-4 h-px left-0 top-[8px] absolute flex-col justify-start items-start inline-flex" />
      <div className="w-9 h-4 left-[24px] top-0 absolute text-gray-400 text-xs font-semibold font-['Mulish'] tracking-tight">Today</div>
    </div>
    <div className="w-20 h-4 left-[91px] top-60 absolute">
      <div className="w-4 h-px left-0 top-[8px] absolute flex-col justify-start items-start inline-flex" />
      <div className="w-14 h-4 left-[24px] top-0 absolute text-gray-400 text-xs font-semibold font-['Mulish'] tracking-tight">Yesterday</div>
    </div>
  </div>
  <div className="w-96 h-96 left-[480px] top-[384px] absolute">
    <div className="w-96 h-80 left-[300px] top-[19px] absolute">
      <div className="w-96 h-px left-0 top-[336px] absolute justify-center items-center inline-flex" />
      <div className="w-96 h-[5px] left-0 top-[280px] absolute justify-center items-center inline-flex" />
      <div className="w-96 h-[6px] left-0 top-[224px] absolute justify-center items-center inline-flex" />
      <div className="w-96 h-px left-0 top-[168px] absolute justify-center items-center inline-flex" />
      <div className="w-96 h-px left-0 top-[112px] absolute justify-center items-center inline-flex" />
      <div className="w-96 h-px left-0 top-[56px] absolute justify-center items-center inline-flex" />
      <div className="w-96 h-px left-0 top-0 absolute justify-center items-center inline-flex" />
    </div>
    
    <div className="w-px h-56 left-[414px] top-[134px] absolute" />
    <div className="h-3 left-[-28.5px] top-[367px] absolute justify-center items-start gap-5 inline-flex">
      <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">0</div>
      <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">1</div>
      <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">2</div>
      <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">3</div>
      <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">4</div>
      <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">5</div>
      <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">6</div>
      <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">7</div>
      <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">8</div>
      <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">9</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">10</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">11</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">12</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">13</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">14</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">15</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">16</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">17</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">18</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">19</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">20</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">21</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">22</div>
      <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">23</div>
    </div>
    <div className="left-[673px] top-0 absolute">
      <div className="left-[7px] top-[336px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">0</div>
      <div className="left-0 top-[280px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">10</div>
      <div className="left-0 top-[224px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">20</div>
      <div className="left-0 top-[168px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">30</div>
      <div className="left-0 top-[112px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">40</div>
      <div className="left-0 top-[56px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">50</div>
      <div className="left-0 top-0 absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">60</div>
    </div>
    <div className="w-96 h-80 left-0 top-[19px] absolute">
      <div className="w-96 h-80 left-0 top-0 absolute bg-stone-200" >
      
      {/* <img src={ygraph} alt="ygraph"/> */}
      </div>
      <div className="w-96 h-80 left-[-9.13px] top-[51.58px] absolute">
        <div className="w-96 h-80 left-0 top-0 absolute"/>
        <div>
        <img src={graph} alt="graph"/>
        </div>
        <div className="top-0">
        <img src={ygraph} alt="ygraph"/>
        </div>
        <div className="w-16 h-20 left-[300px] top-[1.42px] absolute">
          <div className="w-6 h-6 left-[21px] top-[50px] absolute opacity-20 rounded-full border-2 border-blue-600" />
          <div className="w-3.5 h-3.5 left-[26px] top-[55px] absolute bg-white rounded-full shadow border-4 border-blue-600" />
          <div className="w-16 h-9 left-0 top-0 absolute">
            <img className="w-16 h-9 left-[1px] top-[1px] absolute shadow border border-zinc-200" src={sheet} />
            <div className="w-10 h-4 left-[10px] top-[5px] absolute text-center text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">38</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="w-80 h-96 left-[1220px] top-[280px] absolute ">
  <div className="border-l border-r border-gray-300 border-opacity-50 h-[546px] absolute right-70 top-0"></div>
 
    <div className="w-72 left-[32px] top-[32px] absolute text-center text-gray-400 text-base font-semibold font-['Mulish'] leading-snug tracking-tight">Resolved</div>
    <div className="w-72 left-[32px] top-[60px] absolute text-center text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">449</div>
    <div className="w-px h-96 left-0 top-0 absolute flex-col justify-center items-center inline-flex " />
    <div className="w-80 h-px left-0 top-[114px] absolute justify-center items-center inline-flex" />
    
    <div className="w-72 left-[32px] top-[138px] absolute text-center text-gray-400 text-base font-semibold font-['Mulish'] leading-snug tracking-tight">Received</div>
    <div className="w-72 left-[32px] top-[166px] absolute text-center text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">426</div>
    <div className="w-80 h-px left-0 top-[220px] absolute justify-center items-center inline-flex" />
    <div>
      {/* Use the hr element with Tailwind CSS classes */}
      <hr className="border-t-2 border-gray-300 my-[100px]" />
    </div>
    <div className="w-72 left-[32px] top-[244px] absolute text-center text-gray-400 text-base font-semibold font-['Mulish'] leading-snug tracking-tight">Average first response time</div>
    <div className="w-72 left-[32px] top-[272px] absolute text-center text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">33m</div>
    <div className="w-80 h-px left-0 top-[326px] absolute justify-center items-center inline-flex" />
    <div>
      {/* Use the hr element with Tailwind CSS classes */}
      <hr className="border-t-2 border-gray-300 my-[100px]" />
    </div>
    <div className="w-72 left-[32px] top-[350px] absolute text-center text-gray-400 text-base font-semibold font-['Mulish'] leading-snug tracking-tight">Average response time</div>
    <div className="w-72 left-[32px] top-[378px] absolute text-center text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">3h 8m</div>
    <div>
      {/* Use the hr element with Tailwind CSS classes */}
      <hr className="border-t-2 border-gray-300 my-[110px]" />
    </div>
    <div className="w-72 left-[32px] top-[456px] absolute text-center text-gray-400 text-base font-semibold font-['Mulish'] leading-snug tracking-tight">Resolution within SLA</div>
    <div className="w-72 left-[32px] top-[484px] absolute text-center text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">94%</div>
    <div>
      {/* Use the hr element with Tailwind CSS classes */}
      <hr className="border-t-2 border-gray-300 my-[110px]" />
    </div>
    <div className="w-80 h-px left-0 top-[432px] absolute justify-center items-center inline-flex" />
  
  </div>
</div>


  <div className="w-96 h-32 left-[285px] top-[128px] absolute justify-start items-start gap-7 inline-flex">
    <div className="w-64 h-32 relative">
      <div className="w-64 h-32 left-[135px] top-0 absolute justify-center items-center inline-flex">
        <div className="w-64 h-32 bg-white rounded-lg border border-zinc-200" />
      </div>
      <div className="w-48 left-[170px] top-[24px] absolute text-center text-gray-400 text-lg font-bold font-['Mulish'] tracking-wide">Unresolved</div>
      <div className="w-48 left-[170px] top-[60px] absolute text-center text-gray-800 text-4xl font-bold font-['Mulish'] tracking-wide">60</div>
    </div>
    <div className="w-64 h-32 relative">
      <div className="w-64 h-32 left-80 top-0 absolute">
        <div className="w-64 h-32 left-0 top-0 absolute rounded-lg border-2 border-indigo-100" />
        <div className="w-64 h-32 left-0 top-0 absolute bg-white rounded-lg border border-blue-600" />
      </div>
      <div className="w-48 left-[340px] top-[24px] absolute text-center text-blue-600 text-lg font-bold font-['Mulish'] tracking-wide">Overdue</div>
      <div className="w-48 left-[345px] top-[60px] absolute text-center text-blue-600 text-4xl font-bold font-['Mulish'] tracking-wide">16</div>
      <div className="w-4 h-4 left-[210px] top-[102px] absolute">
        <div className="w-3.5 h-4 left-[1px] top-[0.35px] absolute">
        </div>
      </div>
    </div>
    <div className="w-64 h-32 relative">
      <div className="w-64 h-32 left-[500px] top-0 absolute justify-center items-center inline-flex">
        <div className="w-64 h-32 bg-white rounded-lg border border-zinc-200" />
      </div>
      <div className="w-48 left-[540px] top-[24px] absolute text-center text-gray-400 text-lg font-bold font-['Mulish'] tracking-wide">Open</div>
      <div className="w-48 left-[540px] top-[60px] absolute text-center text-gray-800 text-4xl font-bold font-['Mulish'] tracking-wide">43</div>
    </div>
    <div className="w-64 h-32 relative">
      <div className="w-64 h-32 left-[690px] top-0 absolute justify-center items-center inline-flex">
        <div className="w-64 h-32 bg-white rounded-lg border border-zinc-200" />
      </div>
      <div className="w-48 left-[720px] top-[24px] absolute text-center text-gray-400 text-lg font-bold font-['Mulish'] tracking-wide">On hold</div>
      <div className="w-48 left-[720px] top-[60px] absolute text-center text-gray-800 text-4xl font-bold font-['Mulish'] tracking-wide">64</div>
    </div>
  </div>


  <div className="w-96 h-11 left-[420px] top-[25px] absolute">
    <div className="w-11 h-11 left-[1078px] top-0 absolute">
      <div className="w-10 h-10 left-[1px] top-[2px] absolute">
        <div className="w-10 h-10 right-[77.8px] top-0 absolute bg-stone-300 rounded-full" />
        <img className="w-16 h-11 right-[77.8px] top-[-1.67px] absolute" src={header} />
      </div>
      <div className="w-11 h-11 right-20 top-0 absolute rounded-full border border-zinc-200" />
    </div>
    <div className="w-28 h-4 left-[840px] top-[13px] absolute text-right text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">Jones Ferdinand</div>
    <div className="w-px h-8 left-[710px] top-[10px] absolute" />
    <div className="w-4 h-4 left-[720px] top-[10px] absolute">
      <div className="w-1.5 h-1.5 left-[12px] top-[-1px] absolute bg-blue-600 rounded-full border border-slate-50" >
      <img src ={icon}/>
      </div>
    </div>
    <div className="w-4 h-4 left-[735px] top-[10px] absolute">
      <div className="w-3.5 h-3.5 left-0 top-0 absolute">
        <div className="w-3 h-3 left-0 top-0 absolute rounded-full border border-neutral-300" >
         <img src={search}></img>
          </div>
      </div>
    </div>
    <div className="w-96 h-8 left-0 top-[6px] absolute text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">Overview</div>
  </div>

  <div className="w-[394px] h-screen left-0 top-0 absolute bg-zinc-700">
  <div className="left-[76px] top-[41px] absolute opacity-70 text-gray-400 text-lg font-bold font-['Mulish'] tracking-wide">Dashboard</div>
  <div className="w-64 h-14 left-0 top-[128px] absolute">
    <div className="w-0.5 h-14 left-0 top-0 absolute bg-indigo-100" />
    <div className="w-40 left-[72px] top-[18px] absolute text-indigo-100 text-base font-normal font-['Mulish'] tracking-tight">Overview</div>
    <div className="w-4 h-4 left-[32px] top-[20px] absolute">
      <img src={overview} alt="overview logo"></img>
    </div>
  </div>
  <div className="pl-8 pr-6 py-4 left-0 top-[184px] absolute justify-end items-center gap-6 inline-flex">
    <div className="w-4 h-4 relative flex-col justify-start items-start flex" >
    <img src ={tickets} alt="tickets"/>
    </div>
    <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Tickets</div>
  </div>
  <div className="pl-8 pr-6 py-4 left-0 top-[240px] absolute justify-end items-center gap-6 inline-flex">
    <div className="w-4 h-4 relative flex-col justify-start items-start flex" >
      <img src={ideas} alt="ideas"/>
    </div>
    <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Ideas</div>
  </div>
  <div className="pl-8 pr-6 py-4 left-0 top-[296px] absolute justify-end items-center gap-6 inline-flex">
    <div className="w-4 h-4 relative flex-col justify-start items-start flex" >
      <img src={contacts} alt="contacts"/>
    </div>
    <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Contacts</div>
  </div>
  <div className="pl-8 pr-6 py-4 left-0 top-[352px] absolute justify-end items-center gap-6 inline-flex">
    <div className="w-4 h-4 relative flex-col justify-start items-start flex">
     <img src={agents} alt="agents"/>
    </div>
    <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Agents</div>
  </div>
  <div className="pl-8 pr-6 py-4 left-0 top-[408px] absolute justify-end items-center gap-6 inline-flex">
    <div className="w-4 h-4 relative flex-col justify-start items-start flex" >
      <img src={articles} alt="articles"/>
    </div>
    <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Articles</div>
  </div>
  <div className="pl-8 pr-6 py-4 left-0 top-[496px] absolute justify-end items-center gap-6 inline-flex">
    <div className="w-4 h-4 relative flex-col justify-start items-start flex" >  <img src={settings} alt="setting icon"></img>
     </div>
   
    <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Settings</div>
   
  </div>
  <div className="pl-8 pr-6 py-4 left-0 top-[552px] absolute justify-end items-center gap-6 inline-flex">
    <div className="w-4 h-4 relative flex-col justify-start items-start flex" >
    <img src={subscription} alt="subscription"/>
    </div>
    <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Subscription</div>
  </div>
  <div className="w-64 h-px left-0 top-[480px] absolute opacity-5" />
  <div className="w-8 h-8 left-[32px] top-[37px] absolute">
    <div className="w-8 h-8 left-0 top-0 absolute bg-blue-600 rounded-full" >
    <img src="/logo.svg" alt ="logo"/> 
  </div>
  


    
  </div>


  {/* <div className="w-96 h-96 relative bg-zinc-700">
  <div className="w-96 h-80 left-[285px] top-[868px] absolute justify-center items-start gap-7 inline-flex">
    <div className="w-96 h-80 relative flex-col justify-start items-start flex">
      <div className="w-96 h-80 justify-center items-center inline-flex">
        <div className="w-96 h-80 bg-white rounded-lg border border-zinc-200" />
      </div>
      <div className="w-80 text-gray-800 text-lg font-bold font-['Mulish'] tracking-wide">Unresolved tickets</div>
      <div className="w-20 h-4 justify-center items-center inline-flex">
        <div className="w-20 text-right text-blue-600 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">View details</div>
      </div>
      <div className="w-80 h-4"><span style="text-gray-400 text-xs font-normal font-['Mulish'] leading-none tracking-tight">Group: </span><span style="text-slate-600 text-xs font-semibold font-['Mulish'] tracking-tight">Support</span></div>
      <div className="w-96 h-14 relative">
        <div className="w-96 left-[32px] top-[20px] absolute text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">Waiting on Feature Request</div>
        <div className="w-20 left-[434px] top-[20px] absolute text-right text-gray-400 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">4238</div>
        <div className="w-96 h-px left-0 top-[58px] absolute justify-center items-center inline-flex" />
      </div>
      <div className="w-96 h-14 relative">
        <div className="w-96 left-[32px] top-[20px] absolute text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">Awaiting Customer Response</div>
        <div className="w-20 left-[434px] top-[20px] absolute text-right text-gray-400 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">1005</div>
        <div className="w-96 h-px left-0 top-[58px] absolute justify-center items-center inline-flex" />
      </div>
      <div className="w-96 h-14 relative">
        <div className="w-96 left-[32px] top-[20px] absolute text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">Awaiting Developer Fix</div>
        <div className="w-20 left-[434px] top-[20px] absolute text-right text-gray-400 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">914</div>
        <div className="w-96 h-px left-0 top-[58px] absolute justify-center items-center inline-flex" />
      </div>
      <div className="w-96 h-14 px-8 pt-5 pb-4 justify-center items-start gap-6 inline-flex">
        <div className="w-96 text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">Pending</div>
        <div className="w-20 text-right text-gray-400 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">281</div>
      </div>
    </div>
    <div className="w-96 h-80 relative flex-col justify-start items-start flex">
      <div className="w-96 h-80 justify-center items-center inline-flex">
        <div className="w-96 h-80 bg-white rounded-lg border border-zinc-200" />
      </div>
      <div className="w-80 text-gray-800 text-lg font-bold font-['Mulish'] tracking-wide">Tasks</div>
      <div className="w-20 h-4 justify-center items-center inline-flex">
        <div className="w-20 text-right text-blue-600 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">View all</div>
      </div>
      <div className="w-80 h-4 text-gray-400 text-xs font-normal font-['Mulish'] leading-none tracking-tight">Today</div>
      <div className="w-96 h-14 relative">
        <div className="w-80 left-[32px] top-[20px] absolute text-neutral-300 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">Create new task</div>
        <div className="w-6 h-6 left-[490px] top-[17px] absolute">
          <div className="w-6 h-6 left-0 top-0 absolute bg-gray-100 rounded-lg" />
          <div className="w-2.5 h-2.5 left-[7px] top-[7px] absolute">
          </div>
        </div>
        <div className="w-96 h-px left-0 top-[58px] absolute justify-center items-center inline-flex" />
      </div>
      <div className="w-96 h-14 relative">
        <div className="w-80 left-[68px] top-[20px] absolute text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">Finish ticket update</div>
        <div className="w-20 h-6 left-[440px] top-[17px] absolute">
          <div className="w-20 h-6 left-0 top-0 absolute bg-yellow-400 rounded-lg" />
          <div className="w-12 h-3.5 left-[12px] top-[5px] absolute text-center text-white text-xs font-bold font-['Mulish'] uppercase tracking-wide">Urgent</div>
        </div>
        <div className="w-5 h-5 left-[32px] top-[19px] absolute">
          <div className="w-5 h-5 left-0 top-0 absolute rounded-full border-2 border-neutral-300" />
        </div>
        <div className="w-96 h-px left-0 top-[58px] absolute justify-center items-center inline-flex" />
      </div>
      <div className="w-96 h-14 relative">
        <div className="w-80 left-[68px] top-[20px] absolute text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">Create new ticket example</div>
        <div className="w-14 h-6 left-[460px] top-[17px] absolute">
          <div className="w-14 h-6 left-0 top-0 absolute bg-emerald-400 rounded-lg" />
          <div className="w-7 h-3.5 left-[12px] top-[5px] absolute text-center text-white text-xs font-bold font-['Mulish'] uppercase tracking-wide">New</div>
        </div>
        <div className="w-5 h-5 left-[32px] top-[19px] absolute">
          <div className="w-5 h-5 left-0 top-0 absolute rounded-full border-2 border-neutral-300" />
        </div>
        <div className="w-96 h-px left-0 top-[58px] absolute justify-center items-center inline-flex" />
      </div>
      <div className="w-96 h-14 relative">
        <div className="w-80 left-[68px] top-[20px] absolute text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">Update ticket report</div>
        <div className="w-20 h-6 left-[438px] top-[17px] absolute">
          <div className="w-20 h-6 left-0 top-0 absolute bg-gray-100 rounded-lg" />
          <div className="w-12 h-3.5 left-[12px] top-[5px] absolute text-center text-gray-400 text-xs font-bold font-['Mulish'] uppercase tracking-wide">Default</div>
        </div>
        <div className="w-5 h-5 left-[32px] top-[19px] absolute">
          <div className="w-5 h-5 left-0 top-0 absolute bg-blue-600 rounded-full" />
        </div>
      </div>
    </div>
  </div>
  <div className="w-96 h-96 left-[285px] top-[292px] absolute">
    <div className="w-96 h-96 left-0 top-0 absolute justify-center items-center inline-flex">
      <div className="w-96 h-96 bg-white rounded-lg border border-zinc-200" />
    </div>
    <div className="w-96 left-[32px] top-[32px] absolute text-gray-800 text-lg font-bold font-['Mulish'] tracking-wide">Today’s trends</div>
    <div className="w-96 h-4 left-[32px] top-[64px] absolute text-gray-400 text-xs font-normal font-['Mulish'] leading-none tracking-tight">as of 25 May 2019, 09:41 PM</div>
    <div className="w-44 h-4 left-[576px] top-[64px] absolute">
      <div className="w-14 h-4 left-0 top-0 absolute">
        <div className="w-4 h-px left-0 top-[8px] absolute flex-col justify-start items-start inline-flex" />
        <div className="w-9 h-4 left-[24px] top-0 absolute text-gray-400 text-xs font-semibold font-['Mulish'] tracking-tight">Today</div>
      </div>
      <div className="w-20 h-4 left-[91px] top-0 absolute">
        <div className="w-4 h-px left-0 top-[8px] absolute flex-col justify-start items-start inline-flex" />
        <div className="w-14 h-4 left-[24px] top-0 absolute text-gray-400 text-xs font-semibold font-['Mulish'] tracking-tight">Yesterday</div>
      </div>
    </div>
    <div className="w-96 h-96 left-[32px] top-[134px] absolute">
      <div className="w-96 h-80 left-0 top-[19px] absolute">
        <div className="w-96 h-px left-0 top-[336px] absolute justify-center items-center inline-flex" />
        <div className="w-96 h-px left-0 top-[280px] absolute justify-center items-center inline-flex" />
        <div className="w-96 h-px left-0 top-[224px] absolute justify-center items-center inline-flex" />
        <div className="w-96 h-px left-0 top-[168px] absolute justify-center items-center inline-flex" />
        <div className="w-96 h-px left-0 top-[112px] absolute justify-center items-center inline-flex" />
        <div className="w-96 h-px left-0 top-[56px] absolute justify-center items-center inline-flex" />
        <div className="w-96 h-px left-0 top-0 absolute justify-center items-center inline-flex" />
      </div>
      <div className="w-px h-56 left-[414px] top-[134px] absolute" />
      <div className="h-3 left-0 top-[367px] absolute justify-center items-start gap-5 inline-flex">
        <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">0</div>
        <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">1</div>
        <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">2</div>
        <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">3</div>
        <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">4</div>
        <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">5</div>
        <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">6</div>
        <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">7</div>
        <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">8</div>
        <div className="w-1.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">9</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">10</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">11</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">12</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">13</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">14</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">15</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">16</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">17</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">18</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">19</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">20</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">21</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">22</div>
        <div className="w-3.5 text-center text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">23</div>
      </div>
      <div className="left-[673px] top-0 absolute">
        <div className="left-[7px] top-[336px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">0</div>
        <div className="left-0 top-[280px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">10</div>
        <div className="left-0 top-[224px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">20</div>
        <div className="left-0 top-[168px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">30</div>
        <div className="left-0 top-[112px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">40</div>
        <div className="left-0 top-[56px] absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">50</div>
        <div className="left-0 top-0 absolute text-right text-gray-400 text-xs font-normal font-['Mulish'] tracking-tight">60</div>
      </div>
      <div className="w-96 h-80 left-0 top-[19px] absolute">
        <div className="w-96 h-80 left-0 top-0 absolute bg-stone-300" />
        <div className="w-96 h-80 left-[-9.13px] top-[51.58px] absolute">
          <div className="w-96 h-80 left-0 top-0 absolute">
          </div>
          <div className="w-16 h-20 left-[390.13px] top-[1.42px] absolute">
            <div className="w-6 h-6 left-[21px] top-[50px] absolute opacity-20 rounded-full border-2 border-blue-600" />
            <div className="w-3.5 h-3.5 left-[26px] top-[55px] absolute bg-white rounded-full shadow border-4 border-blue-600" />
            <div className="w-16 h-9 left-0 top-0 absolute">
              <img className="w-16 h-9 left-[1px] top-[1px] absolute shadow border border-zinc-200" src="https://via.placeholder.com/64x36" />
              <div className="w-10 h-4 left-[13px] top-[8px] absolute text-center text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">38</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-80 h-96 left-[780px] top-0 absolute">
      <div className="w-72 left-[32px] top-[32px] absolute text-center text-gray-400 text-base font-semibold font-['Mulish'] leading-snug tracking-tight">Resolved</div>
      <div className="w-72 left-[32px] top-[60px] absolute text-center text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">449</div>
      <div className="w-px h-96 left-0 top-0 absolute flex-col justify-center items-center inline-flex" />
      <div className="w-80 h-px left-0 top-[114px] absolute justify-center items-center inline-flex" />
      <div className="w-72 left-[32px] top-[138px] absolute text-center text-gray-400 text-base font-semibold font-['Mulish'] leading-snug tracking-tight">Received</div>
      <div className="w-72 left-[32px] top-[166px] absolute text-center text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">426</div>
      <div className="w-80 h-px left-0 top-[220px] absolute justify-center items-center inline-flex" />
      <div className="w-72 left-[32px] top-[244px] absolute text-center text-gray-400 text-base font-semibold font-['Mulish'] leading-snug tracking-tight">Average first response time</div>
      <div className="w-72 left-[32px] top-[272px] absolute text-center text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">33m</div>
      <div className="w-80 h-px left-0 top-[326px] absolute justify-center items-center inline-flex" />
      <div className="w-72 left-[32px] top-[350px] absolute text-center text-gray-400 text-base font-semibold font-['Mulish'] leading-snug tracking-tight">Average response time</div>
      <div className="w-72 left-[32px] top-[378px] absolute text-center text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">3h 8m</div>
      <div className="w-72 left-[32px] top-[456px] absolute text-center text-gray-400 text-base font-semibold font-['Mulish'] leading-snug tracking-tight">Resolution within SLA</div>
      <div className="w-72 left-[32px] top-[484px] absolute text-center text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">94%</div>
      <div className="w-80 h-px left-0 top-[432px] absolute justify-center items-center inline-flex" />
    </div>
  </div>
  <div className="w-96 h-32 left-[285px] top-[128px] absolute justify-center items-start gap-7 inline-flex">
    <div className="w-64 h-32 relative">
      <div className="w-64 h-32 left-0 top-0 absolute justify-center items-center inline-flex">
        <div className="w-64 h-32 bg-white rounded-lg border border-zinc-200" />
      </div>
      <div className="w-48 left-[32px] top-[24px] absolute text-center text-gray-400 text-lg font-bold font-['Mulish'] tracking-wide">Unresolved</div>
      <div className="w-48 left-[32px] top-[60px] absolute text-center text-gray-800 text-4xl font-bold font-['Mulish'] tracking-wide">60</div>
    </div>
    <div className="w-64 h-32 relative">
      <div className="w-64 h-32 left-0 top-0 absolute">
        <div className="w-64 h-32 left-0 top-0 absolute rounded-lg border-2 border-indigo-100" />
        <div className="w-64 h-32 left-0 top-0 absolute bg-white rounded-lg border border-blue-600" />
      </div>
      <div className="w-48 left-[32px] top-[24px] absolute text-center text-blue-600 text-lg font-bold font-['Mulish'] tracking-wide">Overdue</div>
      <div className="w-48 left-[32px] top-[60px] absolute text-center text-blue-600 text-4xl font-bold font-['Mulish'] tracking-wide">16</div>
      <div className="w-4 h-4 left-[210px] top-[102px] absolute">
        <div className="w-3.5 h-4 left-[1px] top-[0.35px] absolute">
        </div>
      </div>
    </div>
    <div className="w-64 h-32 relative">
      <div className="w-64 h-32 left-0 top-0 absolute justify-center items-center inline-flex">
        <div className="w-64 h-32 bg-white rounded-lg border border-zinc-200" />
      </div>
      <div className="w-48 left-[32px] top-[24px] absolute text-center text-gray-400 text-lg font-bold font-['Mulish'] tracking-wide">Open</div>
      <div className="w-48 left-[32px] top-[60px] absolute text-center text-gray-800 text-4xl font-bold font-['Mulish'] tracking-wide">43</div>
    </div>
    <div className="w-64 h-32 relative">
      <div className="w-64 h-32 left-0 top-0 absolute justify-center items-center inline-flex">
        <div className="w-64 h-32 bg-white rounded-lg border border-zinc-200" />
      </div>
      <div className="w-48 left-[32px] top-[24px] absolute text-center text-gray-400 text-lg font-bold font-['Mulish'] tracking-wide">On hold</div>
      <div className="w-48 left-[32px] top-[60px] absolute text-center text-gray-800 text-4xl font-bold font-['Mulish'] tracking-wide">64</div>
    </div>
  </div>
  <div className="w-96 h-11 left-[285px] top-[30px] absolute">
    <div className="w-11 h-11 left-[1078px] top-0 absolute">
      <div className="w-10 h-10 left-[2px] top-[2px] absolute">
        <div className="w-10 h-10 left-0 top-0 absolute bg-stone-300 rounded-full" />
        <img className="w-16 h-11 left-[-11.67px] top-[-1.67px] absolute" src="https://via.placeholder.com/63x43" />
      </div>
      <div className="w-11 h-11 left-0 top-0 absolute rounded-full border border-zinc-200" />
    </div>
    <div className="w-28 h-4 left-[955px] top-[13px] absolute text-right text-gray-800 text-sm font-semibold font-['Mulish'] leading-tight tracking-tight">Jones Ferdinand</div>
    <div className="w-px h-8 left-[923px] top-[10px] absolute" />
    <div className="w-4 h-4 left-[875px] top-[14px] absolute">
      <div className="w-1.5 h-1.5 left-[10px] top-[-1px] absolute bg-blue-600 rounded-full border border-slate-50" />
    </div>
    <div className="w-4 h-4 left-[835px] top-[14px] absolute">
      <div className="w-3.5 h-3.5 left-0 top-0 absolute">
        <div className="w-3 h-3 left-0 top-0 absolute rounded-full border border-neutral-300" />
      </div>
    </div>
    <div className="w-96 h-8 left-0 top-[6px] absolute text-gray-800 text-2xl font-bold font-['Mulish'] tracking-tight">Overview</div>
  </div>
  <div className="w-64 h-96 left-0 top-0 absolute bg-zinc-700">
    <div className="left-[76px] top-[41px] absolute opacity-70 text-gray-400 text-lg font-bold font-['Mulish'] tracking-wide">Dashboard Kit</div>
    <div className="w-64 h-14 left-0 top-[128px] absolute">
      <div className="w-0.5 h-14 left-0 top-0 absolute bg-indigo-100" />
      <div className="w-40 left-[72px] top-[18px] absolute text-indigo-100 text-base font-normal font-['Mulish'] tracking-tight">Overview</div>
      <div className="w-4 h-4 left-[32px] top-[20px] absolute" />
    </div>
    <div className="pl-8 pr-6 py-4 left-0 top-[184px] absolute justify-end items-center gap-6 inline-flex">
      <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
      <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Tickets</div>
    </div>
    <div className="pl-8 pr-6 py-4 left-0 top-[240px] absolute justify-end items-center gap-6 inline-flex">
      <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
      <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Ideas</div>
    </div>
    <div className="pl-8 pr-6 py-4 left-0 top-[296px] absolute justify-end items-center gap-6 inline-flex">
      <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
      <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Contacts</div>
    </div>
    <div className="pl-8 pr-6 py-4 left-0 top-[352px] absolute justify-end items-center gap-6 inline-flex">
      <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
      <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Agents</div>
    </div>
    <div className="pl-8 pr-6 py-4 left-0 top-[408px] absolute justify-end items-center gap-6 inline-flex">
      <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
      <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Articles</div>
    </div>
    <div className="pl-8 pr-6 py-4 left-0 top-[496px] absolute justify-end items-center gap-6 inline-flex">
      <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
      <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Settings</div>
    </div>
    <div className="pl-8 pr-6 py-4 left-0 top-[552px] absolute justify-end items-center gap-6 inline-flex">
      <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
      <div className="w-40 text-gray-400 text-base font-normal font-['Mulish'] tracking-tight">Subscription</div>
    </div>
    <div className="w-64 h-px left-0 top-[480px] absolute opacity-5" />
    <div className="w-8 h-8 left-[32px] top-[37px] absolute">
      <div className="w-8 h-8 left-0 top-0 absolute bg-blue-600 rounded-full" />
    </div>
  </div>
</div> */}

</div>
  
  
  

  


   


      
     
 


        {/* <div>
   
    <button type="submit" onClick={handleSubmit} className="special-button2">
     AddProduct
    </button>
    <button type="submit" onClick={handleSubmitForUrl} className="special-button">
     AddProductOnEOS
    </button>
    </div> */}
   
   
    </div>
 
 );
      }
  
  export default Producer;
  