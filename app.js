const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //It simplifies the process of logging requests to your application
const connectDB = require('./config/db')

//Load Config
dotenv.config({path: './config/config.env'});

connectDB()

const app = express();

if(process.env.NPM_ENV === 'development'){
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 3000


app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)    
);