import{useEffect, useState} from "react";
import axios from 'axios'
import { Web3Provider } from "@ethersproject/providers";
import { Link } from "react-router-dom";
//import { AbiCoder } from "@ethersproject/abi";
//import{ethers} from 'ethers'


//import Web3 from 'web3';

//const { keccak256, toHexString } = require('ethereum-cryptography/keccak')


//const abiValidation= require( '../abi')
//const Web3 = require('web3');
const ethers = require("ethers");
//const web3 = new window.Web3()
//const keccak256 = require('keccak256')
// const dotenv = require('dotenv')

// dotenv.config({path:'../config/config.env'})
const contractAddress ="0x4F430c214DFc1cF6ace4050025177cB30f129431"
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


function Validation() {

    const [klipId, setKlipId] = useState("")
    // const [batchNumber, setBatchNumber] = useState("")
    // const [mfgDate, setMfgDate] = useState("")
    // const [expiryDate, setExpiryDate] = useState("")
    // const [description, setDescription] = useState("")
    const [valid, setValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [kliphash, setKlipHash] = useState("")
    // const [arrayData, setArrayData] = useState([]);
   ;
    
    
    useEffect(() =>{
      
    
      
  
  
  },[])

  async function validateProduct() {
    try {
        setIsLoading(true)
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
   
      setKlipHash(hash)
// const fetchedData =fetchData()

// const _klipId = ethers.BigNumber.form(fetchedData.klipid, 0);
// const _batchNumber = fetchedData.batchnumber;
// const _mfgDate = ethers.BigNumber(fetchedData.mfgdate, 0);
// const _expiryDate = ethers.BigNumber(fetchedData.expirydate, 0);
// const _warranty = ethers.BigNumber(fetchedData.warranty, 0);
// const _description = fetchedData.description;
// const _klipId = 10;
// const _batchNumber ="XYZ";
// const _mfgDate =1;
// const _expiryDate = 3;
// const _warranty = 2;
// const _description ="digitalreciept" ;
// //const abiCoder = new ethers.utils.AbiCoder();
// const abiCoder = new ethers.utils.AbiCoder();
// const encodedData = abiCoder.encode(
//   ['uint256', 'string', 'uint256', 'uint256', 'uint256', 'string'],
//   [_klipId,_batchNumber, _mfgDate, _expiryDate, _warranty, _description]
// );

// const _hash = ethers.utils.keccak256(encodedData);

// console.log("Hash From DB:", _hash);
  
 

    
        setValid(result)
     
     
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
  
  }

  async function fetchData() {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/products/', {
          params: {
            klipid:klipId,
          },
        });
    
        console.log(response.data);
        return response.data
      } catch (error) {
        console.error(error);
      }
  }
  
  


   
  
    return (
      <div className="App">
      
       
         
        <h1>Validation from  Blockchain interaction Form</h1>
       <form>
       <fieldset>
       <label>
           <p>KLIP ID</p>
           <input type="text" value={klipId}
           onChange={(e)=>setKlipId(e.target.value)} />
         </label>
         {/* <label>
           <p>Batch Number</p>
           <input type="text" value ={batchNumber} 
           onChange={(e)=>setBatchNumber(e.target.value)}/>
         </label>
         <label>
           <p>MFG Date</p>
           <input type="text" value ={mfgDate} 
           onChange={(e)=>setMfgDate(e.target.value)}/>
         </label>
         <label>
           <p>Expiry Date</p>
           <input type ="text" value ={expiryDate}
           onChange={(e)=>setExpiryDate(e.target.value)} />
         </label>
         <label>
           <p>warranty</p>
           <input type="text" value={warranty}
           onChange={(e)=>setWarranty(e.target.value)} />
         </label>
         <label>
           <p>Description</p>
           <input type="text" value={description}
           onChange={(e)=>setDescription(e.target.value)} />
         </label> */}
     
       </fieldset>
       <button type="button"onClick={validateProduct}>Validate Product</button>
      </form>
      {valid
       ?  <div>
       {isLoading ? (
         <div><h1>
         Valid Product
       </h1>
            <p><Link to="/tracking"> Track Product</Link></p> </div>
       ) : (
         <h1>
           Valid Product
         </h1>
       )}
        </div>
       :<div ><h1>Invalid Product</h1></div>
      }
       </div>
       
      



    

    );
  }
  
  export default Validation;
  