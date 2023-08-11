import{useEffect, useState} from "react";
import axios from 'axios'
import { Web3Provider } from "@ethersproject/providers";
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import { abiValidation, contractAddressValidation } from "../constants";
//import { AbiCoder } from "@ethersproject/abi";
//import{ethers} from 'ethers'





//const abiValidation= require( '../abi')
//const Web3 = require('web3');
const ethers = require("ethers");

const contractAddress =contractAddressValidation
const abi= abiValidation

function Validation() {

    const [klipId, setKlipId] = useState("")

    // const [description, setDescription] = useState("")
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [valid, setValid] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [kliphash, setKlipHash] = useState("")
    const [check, setCheck] = useState(null);
    
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
    
   
      console.log("Validation Result :", result);
   
      setKlipHash(hash)
      console.log(kliphash)

 

    
        setValid(result)
        setCheck(true)
        setIsButtonVisible(false);
     
     
    } catch (error) {
      console.log(error.message)
    }

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
  
  console.log(fetchData())
  


   
  
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
  