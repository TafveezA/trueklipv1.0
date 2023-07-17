import{useEffect, useState} from "react";
import axios from 'axios'

const abiValidation= require( '../abi')
const Web3 = require("web3");
const ethers = require("ethers");
import { Web3Provider } from "@ethersproject/providers";
// const dotenv = require('dotenv')

// dotenv.config({path:'../config/config.env'})
const contractAddress ="0x79588896F2e2Dfa46ed290652513CfDa1aa78bF5"
const abi= [
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




function Validation() {

    const [klipId, setKlipId] = useState("")
    const [batchNumber, setBatchNumber] = useState("")
    const [mfgDate, setMfgDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [description, setDescription] = useState("")
    const [valid, setValid] = useState(false);
    const [kliphash, setKlipHash] = useState("")
    const [arrayData, setArrayData] = useState([]);
   ;
    
    
    useEffect(() =>{
      
    
      
  async function validateProduct() {
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
      const provider = new Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi);
      const hash = "xyz"
      const tx = await contract.connect(signer).hashData(klipId,hash);
      await tx.wait();
    
      // const receipt = await provider.getTransactionReceipt(tx.hash);
      // const hash = receipt.logs[0].data;
    
      console.log("Hash:", tx.success);


     
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
      
       
        <h1>Validation Logic</h1>
       <form>
       <fieldset>
         <label>
           <p>Valid</p>
           <input name="name" />
         </label>
         <label>
           <p>Invalid</p>
           <input name="name" />
         </label>
    
     
       </fieldset>
       <button type="submit">Submit</button>
      </form>
       
      </div>



    

    );
  }
  
  export default Validation;
  