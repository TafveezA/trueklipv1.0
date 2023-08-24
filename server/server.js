const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorHandler = require('./middleware/error')
const filterCertificates = require('./utils/filterCertificates')
const app = express()
const logger = require('./middleware/logger')
const connectDB = require('./config/db')
const mongoSanitize = require('express-mongo-sanitize')
const ejs = require('ejs');
const{Web3}=require("web3")
const ABI= require("./config/validationABI.json")



dotenv.config({path:'./config/config.env'})

const ALCHEMY_RPC_URL_SEPOLIA=process.env.ALCHEMY_RPC_URL_SEPOLIA
const CONTRACT_VALIDATION_ADDRESS=process.env.CONTRACT_ADDRESS_VALIDATION
console.log("contract address",CONTRACT_VALIDATION_ADDRESS)
const web3 =new Web3(ALCHEMY_RPC_URL_SEPOLIA)
const contract = new web3.eth.Contract(ABI,CONTRACT_VALIDATION_ADDRESS)


const PORT = process.env.PORT ||5000
const NODE_ENV =process.env.NODE_ENV
connectDB()

app.set('view engine', 'ejs');
app.use(express.json())
app.use(cookieParser())
app.use(logger)
app.use(errorHandler)
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
  }));

// To remove data using these defaults:
app.use(mongoSanitize());

// morgan logger can be used durinmg development
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//setting middleware
app.use(express.urlencoded({extended:false}))







// route file
const products = require('./routes/product.js')

// mount routers
app.use('/api/v1/products',products)


const auth = require('./routes/auth')

app.use('/api/v1/auth',auth)

const smartcontract = require('./routes/smartcontract')
app.use('/api/ethv1/validate',smartcontract)

const qrgenerator = require('./routes/qrgenerator')
app.use('api/v1/generateqr',qrgenerator)

const certificate = require('./routes/certificate')
app.use('/api/v1/certificate',certificate)


//const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')

// use res.render to load up an ejs view file

// index page
app.get('/index', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
      ];
      var tagline = "No programming concept is complete without a cute animal mascot.";
    
      res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
      });
  });
  
  // about page
  app.get('/about', function(req, res) {
    res.render('pages/about');
  });


  app.get('/generate-certificate', (req, res) => {
    // Sample dynamic data for the certificate
    const certificateData = {
        recipient: 'XYZ',
        title: 'Ownership',
        description: 'In accusition of the Product:Rolex Watch.'
    };

    
    ejs.renderFile('./views/index.ejs', certificateData, async(err, html) => {
        if (err) {
            console.error('Error rendering certificate:', err);
            return res.status(500).send('Error generating certificate.');
        }
       
       
      
  res.status(200).send(html);


    });
})

  app.get('/generatepdf',async(req,res)=>{
  try{  const browser = await puppeteer.launch( {headless: false,});
    const page = await browser.newPage();
    
    const url = 'http://localhost:5000/generate-certificate'; 
    const url2 ='https://klip-latest-ui-3a9ab5.teleporthq.app/'

  const cardWidth = 350; 
  const cardHeight = 202; 
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });


  await page.setViewport({ width: cardWidth, height: cardHeight });

  
  await page.pdf({
    path: `certificate${Date.now()}.pdf`, // Output file path
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,
    printBackground: true,
  });
  
    await browser.close();
    console.log('PDF generated successfully.');
    res.status(200).json({suceess:true})
  }catch(error){
    console.log(error.message)
    res.status(500).json({error:error.message})
  }
});



// Dummy data for testing
const certificates = require('./_data/certificate.json')

  
  // Detail API: Getting the certificate details
  app.post('/api/v1/detail', (req, res) => {
    const { truklipid } = req.body;
  
    const certificate = certificates.find(cert => cert.truklipid === truklipid);
  
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
  
    return res.json(certificate);
  });
  
  // Listing API: Listing TruKLIP Certificates with filters and text search
  app.post('/api/v1/list', (req, res) => {
    try {
        const searchText = req.body.searchText.toLowerCase();
        const { dateType, specificDate, startDate, endDate } = req.body.filter;
    
        const filteredCertificates = certificates.filter(certificate => {
          // Filter based on search text
          if (searchText) {
            if (
              certificate.brandName.toLowerCase().includes(searchText) ||
              certificate.truklipid.toLowerCase().includes(searchText)
            ) {
              return true;
            }
            return false;
          }
    
          const {isSameDay,isSameWeek,isSameMonth,isSameYear,isWithinDateRange} = filterCertificates
          const certificateDate = new Date(certificate.certificateDateTime);
          if (dateType === 0) return true; // All Days
          if (dateType === 1) return isSameDay(certificateDate, new Date()); // Today
          if (dateType === 2) return isSameWeek(certificateDate, new Date()); // This week
          if (dateType === 3) return isSameMonth(certificateDate, new Date()); // This month
          if (dateType === 4) return isSameYear(certificateDate, new Date()); // This year
          if (specificDate) return isSameDay(certificateDate, new Date(specificDate));
          if (startDate && endDate) {
            return isWithinDateRange(certificateDate, new Date(startDate), new Date(endDate));
          }
        });
        console.log(filteredCertificates.length)
        res.json({filteredCertificates});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });

const productsdata =require('./_data/products.json')
  
  
  app.post('/api/v1/sync', async (req, res) => {
    try {
      const { truklipid } = req.body;
    const expectedLength =7
      if (!truklipid || typeof truklipid !== 'string' || truklipid.length !== expectedLength) {
        return res.status(400).json({ error: 'Invalid input' });
      }
  

      const product = productsdata.find(prod => prod.truklipid === truklipid);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const responseFromBlockchain = await contract.methods.validationResult(truklipid).call();
  
      const isGenuine = responseFromBlockchain === true;
  
      if (isGenuine) {
        const response = {
          product: product,
          validityFromBlockchain: true,
        };
        return res.json(response);
      } else {
        const response = {
            product: product,
            validityFromBlockchain: false,
            message:'product is not genuine',
          }
        return res.status(200).json(response);
      }
    } catch (error) {
      console.error('Error in /api/v1/sync:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  




  

const server =app.listen(PORT,console.log(`Node API app is runnning on ${NODE_ENV} enviornment port :${PORT}`)
)



//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error:${err.message}`)
    server.close(()=>process.exit(1))
})

module.exports = app;