// ProductStage.js

import React from 'react';

const ProductStage = ({ event, date, imageUrl }) => {
  return (
    <div className="bg-grey-500 rounded-lg p-4 shadow-md ">
      {/* <div className="w-12 h-12 bg-blue-500 rounded-full mb-2 border-black border-2"></div> */}
      {imageUrl && <img src={imageUrl} alt="Product" width={600} height={500}  className="w-11/12 mb-2 rounded-md" />}
      <div className="text-gray-700 mb-2 font-medium">{date}</div>
      <div className='text-black font-semibold'>{event}</div>
    </div>
  );
};

export default ProductStage;
