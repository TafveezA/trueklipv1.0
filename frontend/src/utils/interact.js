import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { abiCertification, contractAddressCertification } from "./constants";

const CERTIFICATION_ABI = abiCertification;
const CONTRACT_ADDRESS = contractAddressCertification;

const connect = async () => {
  try {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("accounts", accounts[0]);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const mintNFT = async (productName, truklipId, description, image, imageUrl) => {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  try {
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CERTIFICATION_ABI, signer);
    const metadata = {
      productname: productName,
      truklipid: truklipId,
      description: description,
      image: image,
      url: imageUrl,
    };
    console.log('Minting NFT with metadata before mint:', metadata);
    const nfturi = JSON.stringify(metadata);
    const hash = await contract.safeMint(address, nfturi);
    console.log("minting NFT with hash", hash);
    console.log('Minting NFT with metadata:', metadata);
  } catch (error) {
    console.error('Error uploading file: ', error);
  }
};

export { mintNFT, connect };
