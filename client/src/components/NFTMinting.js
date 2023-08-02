import React from "react";
import { abiCertification,contractAddressCertification,IPFS_INFURAPROJECT_ID,IPFS_PRIVATE_KEY } from "../constants";
import { useState } from "react";
//import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
const ethers = require("ethers");



const projectId=IPFS_INFURAPROJECT_ID
const projectSecret=IPFS_PRIVATE_KEY
const CERTIFICATION_ABI=abiCertification
const CONTRACT_ADDRESS=contractAddressCertification

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
  })
  

function NFTMinting(){
    const [metadata, setMetadata] = useState({
        productname: '',
        trueklipid:'',
        description: '',
        image: null,
        url:'',
      })
   
      const handleChange = (e) => {
        const { productname, value } = e.target;
        setMetadata((prevMetadata) => ({ ...prevMetadata, [productname]: value }))
      }
    //   const handleIdChange = (e) => {
    //     const { trueklipid, value } = e.target;
    //     setMetadata((prevMetadata) => ({ ...prevMetadata, [trueklipid]: value }))
    //   }
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        setMetadata((prevMetadata) => ({ ...prevMetadata, image: file }))
      }
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        
        // if (window.ethereum !== "undefined"){
            const accounts = await window.ethereum.request({method:'request_Accounts'})
        //     console.log("accounts",accounts[0])
        // }
      const provider = new Web3Provider(window.ethereum)|| new ethers.JsonRpcProvider("")
      const signer = await provider.getSigner()
      const address=await signer.getAddress()
      console.log(await signer.getAddress())
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CERTIFICATION_ABI,signer)
      try {
        const added = await client.add(metadata.image)
        const fileurl = `https://infura-ipfs.io/ipfs/${added.path}`
        setMetadata((prevMetadata) => ({ ...prevMetadata, [metadata.url]:fileurl }))
        console.log("IPFS URI: ", fileurl)
      } catch (error) {
        console.log('Error uploading file: ', error)
      } 
      const  nfturl = JSON.stringify(metadata)
      const hash = await contract.safeMint(address,nfturl)
      console.log("minting NFT with hash",hash)
      console.log('Minting NFT with metadata:', metadata)
      setMetadata({ name: '',trueklipid:'', description: '', image: null, });
      }
    







    return(
      <div className="p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Mint an NFT Certificate</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="productname" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="productname"
            name="productname"
            value={metadata.productname}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={metadata.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full resize-none focus:outline-none focus:ring focus:border-blue-300"
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
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          Mint NFT
        </button>
      </form>
    </div>
    )
}

export default NFTMinting




