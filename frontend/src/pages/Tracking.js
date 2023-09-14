// ProductTracking.js

import React from 'react';
import ProductStage from '../components/ProductStage';
import { timelineData } from '../components/data';



const ProductTracking = () => {
  return (
    <div className="container mx-auto mt-8 flex-row">
      <h2 className="text-3xl font-bold mb-4 text-center p-2 py-2">Product Tracking</h2>
      <div className="grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">
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
