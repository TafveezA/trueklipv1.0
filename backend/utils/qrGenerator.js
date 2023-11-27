import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
//const axios = require('axios');
//import axios from 'axios'

//const apiUrl = 'http://localhost:5000/api/v1/products/'
inquirer
  .prompt([
    {
      message: "Enter the data to be stored in the QR code",
      name: "data",
    },
  ])
  .then((answers) => {
    const data = answers.data;
    const qr_svg = qr.image(data);
    qr_svg.pipe(fs.createWriteStream(`qr_image${JSON.parse(data).truklip}.jpg`));

    fs.writeFile("data.json", data, (err) => {
      if (err) {
        console.error("An error occurred while saving the data:", err);
      } else {
        console.log("The data has been saved!");
       

      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong", error);
    }
  });
