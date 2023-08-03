// ProductStage.js

import React from 'react';

const ProductStage = ({ event, date, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="w-12 h-12 bg-blue-500 rounded-full mb-2"></div>
      {imageUrl && <img src={imageUrl} alt="Product" className="w-full mb-2 rounded-md" />}
      <div className="text-gray-600 mb-2">{date}</div>
      <div>{event}</div>
    </div>
  );
};

export default ProductStage;
