import React from "react";
import { abiCertification,contractAddressCertification } from "../constants";
import { useState } from "react";
//import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
const ethers = require("ethers");




const CERTIFICATION_ABI=abiCertification;
const CONTRACT_ADDRESS=contractAddressCertification;
const projectId = "2SVWWrhQ3SgcSyOW8qroLdETZf2"
const projectSecret = "76cc620d93837d2f1171082c5a44e82f"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

function NFTMinting(){
    const [metadata, setMetadata] = useState({
        name: '',
        description: '',
        image: null,
      })
      const [fileUrl, updateFileUrl] = useState(``)
      const [truKlipId,setTruKlipId] = useState()
      const handleChange = (e) => {
        const { name, value } = e.target;
        setMetadata((prevMetadata) => ({ ...prevMetadata, [name]: value }));
      }
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setMetadata((prevMetadata) => ({ ...prevMetadata, image: file }));
      }
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        if (window.ethereum != "undefined"){
            const accounts = await window.ethereum.request({method:'request_Accounts'})
        }
      const provider = new Web3Provider(window.ethereum)
      const signer = await provider.getSigner()
      console.log(await signer.getAddress())
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CERTIFICATION_ABI,signer);
     
      const hash = await contract.mint(truKlipId,metadata)

     
        
        console.log('Minting NFT with metadata:', metadata);
        setMetadata({ name: '', description: '', image: null });
      }
    




const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
})

function IPFS() {

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`
      updateFileUrl(url)
      console.log("IPFS URI: ", url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
}

    return(
        <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Mint an NFT</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={metadata.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              required
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
              className="border border-gray-300 rounded-lg px-4 py-2 w-full resize-none"
              rows="4"
              required
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
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg"
          >
            Mint NFT
          </button>
        </form>
      </div>
    )
}

export default NFTMinting




