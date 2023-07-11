import axios from 'axios'
import fs from'fs';

// Assuming qrData contains the data obtained from the QR code
const filePath = 'data.json'


// Read the contents of the file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
  
    // Parse the JSON data
    const jsonData = JSON.parse(data);

// API endpoint URL
const apiUrl = 'http://localhost:5000/api/v1/products/'

// Request body containing the data from the QR code
const requestBody = {
  name: jsonData.name,
  quantity:jsonData.quantity,
  price:jsonData.price,
  description:jsonData.digitalreciept
};
console.log(jsonData)
//Make a POST request to the API
axios.post(apiUrl, requestBody)
  .then((response) => {
    console.log('Data successfully inserted into the API:', response.data);
  })
  .catch((error) => {
    console.error('Error inserting data into the API:', error.data);
  });





;



//   // Access individual properties
//   console.log('Name:', jsonData.name);
//   console.log('Quantity:', jsonData.quantity);
//   console.log('Price:', jsonData.price);
//   console.log('Description:', jsonData.description);
});