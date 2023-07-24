import{useEffect, useState} from "react";
import axios from 'axios'
import { Web3Provider } from "@ethersproject/providers";
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import { abiValidation, contractAddressValidation } from "../constants";
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
const contractAddress =contractAddressValidation
const abi= abiValidation

function Validation() {

    const [klipId, setKlipId] = useState("")
    // const [batchNumber, setBatchNumber] = useState("")
    // const [mfgDate, setMfgDate] = useState("")
    // const [expiryDate, setExpiryDate] = useState("")
    // const [description, setDescription] = useState("")
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [valid, setValid] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [kliphash, setKlipHash] = useState("")
    const [check, setCheck] = useState(null);
    
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
        setCheck(true)
        setIsButtonVisible(false);
     
     
    } catch (error) {
      console.log(error.message)
    }

  }
  //setKlipId(0)
//validateProduct()

  // function apiCall(data){
  //   const jsonData = JSON.parse(data);
  //   const apiUrl = 'http://localhost:5000/api/v1/products/'
  //   const requestBody = {
  //       klipid: jsonData.klipid,
  //       batchnumber:jsonData.batchnumber,
  //       mfgdate:jsonData.mfgdate,
  //       expirydate:jsonData.expirydate,
  //       mfgdate:jsonData.mfgdate,
  //       warranty:jsonData.warranty,
  //       description:jsonData.description
  //     };
    
  
  //   axios.post(apiUrl, requestBody)
  //   .then((response) => {
  //     console.log('Data successfully inserted into the API:', response.data);
  //   })
  //   .catch((error) => {
  //     console.error('Error inserting data into the API:', error.data);
  //   });
  
  // }

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
      
       
         
      <div> <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-8">
          <h1 className="text-2xl font-bold text-gray-800">True Klip Blockchain Validation</h1>
        </div>
      </header></div>
	   <img className="mx-auto p-4" src={logo} alt="Logo" />
      

<form className="max-w-lg mx-auto">
  <fieldset>
    <div className="mb-4">
      <label htmlFor="klipId" className="text-gray-700 text-lg font-medium">
        Tru KLIP ID
      </label>
      <input
        type="text"
        id="klipId"
        value={klipId}
        onChange={(e) => setKlipId(e.target.value)}
        className="appearance-none bg-gray-100 border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500 w-full"
      />
    </div>
    {/* Rest of the fields... */}
  </fieldset>
  {isButtonVisible && (
        <button
          type="button"
          onClick={validateProduct}
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        >
          Validate Product
        </button>
      )}
</form>
      {valid
       ?  <div>
       {isLoading ? (
         <div><h1 className="text-green-500 text-2xl font-semibold">
         Yes Valid Product
       </h1>
            <p className="text-black-600"> Track the product journey by visiting<Link to="/tracking"  className="text-blue-500"> Track</Link></p> </div>
       ) : (
        <h1 className="text-green-500 text-2xl font-semibold">
         Valid Product
         </h1>

       )}
        </div>
       :<div >  {check ? (
        <div><h1 className="text-red-500 text-2xl font-semibold">
        oh No Invalid Product
      </h1>
      
            </div>
      ) : (
        <h1>
          
        </h1>
      )}</div>
      }
       </div>
       
      



    

    );
  }
  
  export default Validation;
  