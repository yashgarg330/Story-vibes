const path = require('path');
const express = require('express');
const dotenv = require('dotenv'); //This module loads environment variables from a .env file that you create and adds them to the process.env object that is made available to the application.
const morgan = require('morgan'); //It simplifies the process of logging requests to your application
const exphbs = require('express-handlebars');// To set up template engines
const connectDB = require('./config/db');
//Load Config
dotenv.config({path: './config/config.env'});

connectDB()

const app = express();

//Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//HandleBars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//Routers
app.use('/', require('./routes/index'));

//Static folder: public folder is use by anyone no need to define path
app.use(express.static(path.join(__dirname,'public'))); 



const PORT = process.env.PORT || 3000
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)    
);