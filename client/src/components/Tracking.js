import{useEffect, useState} from "react";
import axios from 'axios'
import { Web3Provider } from "@ethersproject/providers";
import '../App.css';
import logo from '../logo.svg';

//const abiValidation= require( '../abi')
//const Web3 = require("web3");
const ethers = require("ethers");

// const dotenv = require('dotenv')

// dotenv.config({path:'../config/config.env'})
const contractAddress ="0xa055830185C45fCA70A257707d74fC6a3a8e9dA5"
const abi=[
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
			}
		],
		"name": "getHashById",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_klipId",
				"type": "uint256"
			}
		],
		"name": "Validate",
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

    const [tracking, setTracking] = useState("")
    
    
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
      setValid(result)
      setKlipHash(hash)


     
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
		<h1>Track the Product</h1>
		<img src={logo} alt="Logo" />
        </div>
	 
		
	
         <div className="Table">
      <table>
                <tr>
                    <th>Station</th>
                    <th>Status</th>
                    <th>Result</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.station}</td>
                            <td>{val.status}</td>
                            <td>{val.klipid}</td>
                        </tr>
                    )
                })}
            </table>
			</div>
       </div>
       
      



    

    );
  }
  
  export default Tracking;
  