const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorHandler = require('./middleware/error')
const app = express()
const logger = require('./middleware/logger')
const connectDB = require('./config/db')
const mongoSanitize = require('express-mongo-sanitize')
const ejs = require('ejs');



dotenv.config({path:'./config/config.env'})
const PORT = process.env.PORT ||5000
const NODE_ENV =process.env.NODE_ENV
connectDB()

app.set('view engine', 'ejs');
app.use(express.json())
app.use(cookieParser())
app.use(logger)
app.use(errorHandler)
app.use(cors({
    origin: 'http://localhost:3000',
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

    
    ejs.renderFile('./views/index.ejs', certificateData, (err, html) => {
        if (err) {
            console.error('Error rendering certificate:', err);
            return res.status(500).send('Error generating certificate.');
        }
        res.status(200).send(html);
    });
});
  

const server =app.listen(PORT,
                console.log(`Node API app is runnning on ${NODE_ENV} enviornment port :${PORT}`)
)



//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error:${err.message}`)
    server.close(()=>process.exit(1))
})

