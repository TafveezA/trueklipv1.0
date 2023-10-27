import React, { useState } from 'react';
import TextRecognition from './TextRecognization';
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };
  
  return (
    <div className='flex flex-row '>
    <div >
      <input  type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img className='special-button2' src={selectedImage} alt="Selected" />}
      
    </div>
    <TextRecognition selectedImage = {selectedImage}/>
    </div>
  );
};
export default ImageUploader;