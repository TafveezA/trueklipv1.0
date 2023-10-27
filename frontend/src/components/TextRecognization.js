import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
const TextRecognition = (props) => {
  const selectedImage = props.selectedImage;
  const [recognizedText, setRecognizedText] = useState('');
  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        const result = await Tesseract.recognize(selectedImage);
        setRecognizedText(result.data.text);
      }
    };
    recognizeText();
  }, [selectedImage]);
  return (
    <div className='background-gradient'>
      <h2 className='text-grey-200 font-bold'>Recognized Text:</h2>
      <p className='font-semibold'>{recognizedText}</p>
    </div>
  );
};
export default TextRecognition;