
const asyncHandler = require('../middleware/async')
const qr = require('qr-image');
const fs =require( 'fs');

// const{Web3}=require("web3")
// const ABI= require("../config/validationABI.json")
// const ALCHEMY_RPC_URL_SEPOLIA="https://eth-sepolia.g.alchemy.com/v2/FOxH7918EsvBRVwTUVGk5gzhgE2UFoxJ"
// const CONTRACT_VALIDATION_ADDRESS="0xdeFd0014ead1D3aC3f172c27fb59c13609a8cED8"
// const web3 =new Web3(ALCHEMY_RPC_URL_SEPOLIA)
// const contract = new web3.eth.Contract(ABI,CONTRACT_VALIDATION_ADDRESS)



// @desc  generate QR Code
// @route POST /api/v1/generateqr
// @access Private
exports.generateQR = asyncHandler(async(req,res,next)=>{
    const data = req.params;
    const qr_svg = qr.image(data);
    qr_svg.pipe(fs.createWriteStream(`qr_image${Date.now()}.jpg`));
    
    fs.writeFile("data.json", data, (err) => {
      if (err) {
        console.error("An error occurred while saving the data:", err);
      } else {
        console.log("The data has been saved!");
       
    
      }
    });
                          
             res.status(200).json({
              truklipId:id,
              success:true,
              valid:result,
             })
            
})









