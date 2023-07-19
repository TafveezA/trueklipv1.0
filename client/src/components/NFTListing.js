import React from 'react';


const NFTListing = ({ nft }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={nft.image} alt={nft.name} className="w-full h-64 object-cover rounded-lg" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">{nft.name}</h2>
        <p className="text-gray-600">{nft.description}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-700 font-medium">{nft.price} ETH</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTListing;