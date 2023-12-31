import React from "react";
// import * as IPFS from 'ipfs-core';
import { abiCertification,contractAddressCertification,IPFS_INFURAPROJECT_ID,IPFS_PRIVATE_KEY } from "../constants";
import { loadNetwork,loadAccount,loadProvider } from "../utils/interact";
import { useState } from "react";
//import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
const ethers = require("ethers");



// const node = await IPFS.create();
const projectId=IPFS_INFURAPROJECT_ID
const projectSecret=IPFS_PRIVATE_KEY
const CERTIFICATION_ABI=abiCertification
const CONTRACT_ADDRESS=contractAddressCertification

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
const infuraClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
  })


  

function NFTMinting(){
  
      const [productName,setProductName] = useState('')
      const [truklipId,setTruklipId] = useState('')
      const [description,setDescription] = useState('')
      const [imageUrl,setImageUrl] = useState('')
      const[image,setImage] = useState(null)
      const [uri,setUri]=useState('')


   
      const handleChange = (e) => {
       setProductName(e.target.value)
      }
      const handleIdChange = (e) => {
       setTruklipId(e.target.value)
      }
      const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
       }
    
      const handleImageChange = async(e) => {
        const file = e.target.files[0];
        const added = await infuraClient.add(file)
        //const addedToLocal = await node.add(file)
        setImage(file)
        const fileurl = `https://infura-ipfs.io/ipfs/${added.path}`
        //const localFileUrl =`https://ipfs.io/ipfs/${addedToLocal.path}`
      
        console.log("IPFS URI INFURA: ", fileurl)
        //console.log("IPFS URL Local Client",localFileUrl)
        setImageUrl(fileurl)
      }
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (window.ethereum !== "undefined"){
            const accounts = await window.ethereum.request({method:'eth_requestAccounts'})
            console.log("accounts",accounts[0])
        }

       
     
      try {
        const provider = new Web3Provider(window.ethereum)
        const signer =  provider.getSigner()
        const address= await signer.getAddress()
        console.log(await signer.getAddress())
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CERTIFICATION_ABI,signer)
      const metadata= {
        productname:productName,
        truklipid:truklipId,
        description:description,
        image:image,
        url:imageUrl,
      }
        console.log('Minting NFT with metadata before mint:', metadata)
        const  nfturi = JSON.stringify(metadata)
        setUri(nfturi)
        const hash = await contract.safeMint(address,nfturi)
        console.log("minting NFT with hash",hash)
        console.log('Minting NFT with metadata:', metadata)
       setProductName('')
       setTruklipId('')
       setDescription('')
       setImageUrl('')
       setImage('')
 
      } catch (error) {
        console.log('Error uploading file: ', error)
      } 
   
      }
    







    return(
      <div className="p-4 sm:p-6 md:p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-xl md:text-2xl font-semibold mb-4">Mint an NFT Certificate</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="mb-4">
          <label htmlFor="productname" className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="productname"
            name="productname"
            value={productName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-2 md:px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="truklipid" className="block text-gray-700 font-medium mb-2">
            TruKlipId
          </label>
          <input
            type="text"
            id="trueklipid"
            name="trueklipid"
            value={truklipId}
            onChange={handleIdChange}
            className="border border-gray-300 rounded-lg px-2 md:px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            className="border border-gray-300 rounded-lg px-2 md:px-4 py-2 w-full resize-none focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="border border-gray-300 rounded-lg px-2 md:px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="special-button2"
        >
          Mint NFT
        </button>
      </form>
    </div>
    
    )
}

export default NFTMinting




