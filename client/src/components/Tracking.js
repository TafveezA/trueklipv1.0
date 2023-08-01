import{useEffect, useState} from "react";
import axios from 'axios'
import { Web3Provider } from "@ethersproject/providers";
import '../App.css';
import logo from '../logo.svg';
import { abiValidation,contractAddressValidation } from "../constants";

//const abiValidation= require( '../abi')
//const Web3 = require("web3");
const ethers = require("ethers");

// const dotenv = require('dotenv')

// dotenv.config({path:'../config/config.env'})
const contractAddress = contractAddressValidation
const abi=abiValidation
const data = [
    { station: "Factory", status: "Packing", klipid: "a1" },
    { station: "Shipping", status: "Pending", klipid: "bhaq21" },
    { station: "RegionalFacility", status: "Onsale", klipid: "daa1@" },
    { station: "Retailer", status: "In Stock", klipid: "zinsgh#1" },
    { station: "Customer", status:"Consumed", klipid: "alp2" }
]

function Tracking() {

    const [klipId, setKlipId] = useState("")
    // const [batchNumber, setBatchNumber] = useState("")
    // const [mfgDate, setMfgDate] = useState("")
    // const [expiryDate, setExpiryDate] = useState("")
    // const [description, setDescription] = useState("")
    const [valid, setValid] = useState(false);
    const [kliphash, setKlipHash] = useState("")
    // const [arrayData, setArrayData] = useState([]);

    // const [tracking, setTracking] = useState("")
    
    
    useEffect(() =>{
      
       
      
      
  
  
  },[])

//   async function requestAccount(){
    
//   }
 

  async function trackProduct() {
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
      console.log('klipID: ' ,klipId)
      const hash = await contract.getHashById(klipId)

      console.log('hash' , hash)
      const result = await contract.Validate(klipId);

      console.log("Valid",result)
    
      //const receipt = await provider.getTransactionReceipt(result.hash);
      //const hash = receipt.logs[0].data;
    
      console.log("Validation Result :", result);
      
      //setKlipHash(hash)


     
    } catch (error) {
      console.log(error.message)
    }

  }
  //setKlipId(0)
//validateProduct()

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
		<div>
		<h1 className="text-3xl font-bold underline">Track the Product</h1>
		<img  className="mx-auto p-4" src={logo} alt="Logo" />
        </div>
	 
		
	
		<div className="Table overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead>
      <tr>
        <th className="py-3 px-6 text-left">Station</th>
        <th className="py-3 px-6 text-left">Status</th>
        <th className="py-3 px-6 text-left">KlipID</th>
      </tr>
    </thead>
    <tbody>
      {data.map((val, key) => {
        return (
          <tr key={key}>
            <td className="py-4 px-6">{val.station}</td>
            <td className="py-4 px-6">{val.status}</td>
            <td className="py-4 px-6">{val.klipid}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


       </div>
       
      



    

    );
  }
  
  export default Tracking;
  