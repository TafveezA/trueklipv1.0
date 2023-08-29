import React from 'react';
import NFTs from '../components/NFTs';

function NFTMarketplace(){
  const nfts = [
    {
      name: 'Certificate 1',
      image: 'https://ipfs.io/ipfs/QmV2yxSnDXJYh3JPyxUo7z543VdkX1RwZvBaB5Estn8mVZ?filename=certificate1.jpg',
      description: 'Description of Certificate 1',
      price: '1004',
    },
    {
      name: 'Certificate 2',
      image: 'https://ipfs.io/ipfs/QmfEdGbgtv1cZZG7FimB6z7CAPCK5sAgPygXJnA8P5WTTy?filename=certificate2.jpg',
      description: 'Description of Certificate 2',
      price: '425',
    },
    {
        name: 'Certificate 3',
        image: 'https://ipfs.io/ipfs/QmasfQZAdbJNnf7DfiXnPcSFYKWrKwnbxsGnGjmKP9yV64?filename=certificate3.jpg',
        description: 'Description of Certificate 3',
        price: '1200',
      },
      {
        name: 'Certificate 4',
        image: 'https://ipfs.io/ipfs/QmbnrJh54SFRvH1WNizmBW6gSmYyE5gsJ9QfB1gJLdTN13?filename=certificate4.jpeg',
        description: 'Description of Certificate 4',
        price: '280',
      },
    // Add more NFTs
  ]
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-8">
          <h1 className="text-2xl font-bold text-gray-800">Ownership NFT</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nfts.map((nft, index) => (
            <NFTs key={index} nft={nft} />
          ))}
        </div>
      </main>
    
     </div>
  
  );
};

export default NFTMarketplace;
