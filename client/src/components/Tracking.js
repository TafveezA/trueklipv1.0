// ProductTracking.js

import React from 'react';
import ProductStage from './ProductStage';

const timelineData = [
  { id: 1, event: 'Manufactured', date: '2023-08-01', imageUrl: 'https://ipfs.io/ipfs/QmWUwXuKc2e6Z5BqHXW7nT3JL3UfA8FVzvPsfNKs6tQhCJ?filename=artsample.jpg' },
  { id: 2, event: 'Shipped to Retailer', date: '2023-08-05', imageUrl: 'https://ipfs.io/ipfs/QmeAy4SB1kjzfkk7i3YiAZhektUi3qD5S25Qd8NVJkszJb?filename=lvbagsample.jpg' },
  { id: 3, event: 'Received by Retailer', date: '2023-08-10', imageUrl: 'https://ipfs.io/ipfs/QmNrbckVgoU3YVFFm2Yva59ecnkXidNDwgLcCr2rj8oiBG?filename=watchsample.jpg' },
  { id: 4, event: 'Delivered to Customer', date: '2023-08-15', imageUrl: 'https://ipfs.io/ipfs/QmUes7gpuwhgo4Dz8qcNuP7o5qAQT9TWDfR7B45hYA9h6A?filename=Diamondsample.jpg' },
  // Add more timeline events here...
];

const ProductTracking = () => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Product Tracking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {timelineData.map((event) => (
          <ProductStage
            key={event.id}
            event={event.event}
            date={event.date}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductTracking;
