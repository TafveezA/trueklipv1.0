import{useEffect, useState} from "react";
import axios from 'axios'
import {Html5QrcodeScanner} from "html5-qrcode"
//const { JsonRpcProvider } = require("@ethersproject/providers");
import { Web3Provider } from "@ethersproject/providers";

//import {abiValidation} from "../abi"
//import dotenv from 'dotenv'
const Web3 = require("web3");
const ethers = require("ethers");
// const dotenv = require('dotenv')

//dotenv.config({path:'/env'})
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

//const contractAddressValidation =process.env


function Producer() {
    const [scanResult,setScanResult]=useState(null)
    const [klipId, setKlipId] = useState("")
    const [batchNumber, setBatchNumber] = useState("")
    const [mfgDate, setMfgDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [description, setDescription] = useState("")
    const [warranty, setWarranty] = useState("")
    const [productAdded, setProductAdded] = useState(false);
    const [kliphash, setKlipHash] = useState("")
    const [arrayData, setArrayData] = useState([]);
   ;
    const [temp, setTemp] = useState("")
    
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
      
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
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

      setKlipId(jsonData.klipid)
      setBatchNumber(jsonData.batchnumber)
      const batchNumber=jsonData.batchnumber;
      const mfgDate =jsonData.mfgdate;
      const expiryDate =jsonData.expiryDate;
      const warranty=jsonData.warranty;
      const description=jsonData.description;


      const tx = await contract.connect(signer).hashData(klipId, batchNumber, mfgDate, expiryDate, warranty, description);
      await tx.wait();
    
      // const receipt = await provider.getTransactionReceipt(tx.hash);
      // const hash = receipt.logs[0].data;
    
      console.log("Hash:", tx.success);


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
    //await tx.wait();
  
    // Get the transaction receipt to retrieve the hash value
    //const receipt = await provider.getTransactionReceipt(tx.hash);
    //const hash = receipt.logs[0].data;
  
    console.log("Hash:", tx);
  }catch (error) {
  console.log(error.message);
}
  }

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
       <h1>Klip QR Code Scanner</h1>
       {scanResult
       ?<div>success:<a href={addProduct(scanResult)}></a></div>
       :<div id ="reader"></div>
       }
   
       <div>
        <br></br>
       <button type="submit" onClick={callHashData}>Submit</button>
       </div>
      </div>



    

    );
      }
  
  export default Producer;
  