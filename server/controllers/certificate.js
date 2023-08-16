const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const ejs = require('ejs');




exports.returnCertificate = asyncHandler(async(req,res,next)=>{
   
   // dynamic data for the certificate
    const certificateData = {
        recipient: 'Tafveez',
        title: 'Ownership',
        description: 'In accusition of the Product:Rolex Watch.'
    };

    
    ejs.renderFile('../views/pages/nft.ejs', certificateData, (err, html) => {
        if (err) {
            console.error('Error rendering certificate:', err);
            return res.status(500).send('Error generating certificate.');
        }
        res.status(200).send(html);
    });
})



