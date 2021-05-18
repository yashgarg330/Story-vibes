const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); //This module loads environment variables from a .env file that you create and adds them to the process.env object that is made available to the application.
const morgan = require("morgan"); //It simplifies the process of logging(console.log,put,get request) requests to your application
const exphbs = require("express-handlebars"); // To set up template engines
const passport = require("passport");
const session = require("express-session"); //You assign the client an ID and it makes all further requests using that ID. Information associated with the client is stored on the server linked to this ID.
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

//Load Config
dotenv.config({ path: "./config/config.env" });

//passport Config
require("./config/passport")(passport);

connectDB();

const app = express();

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//HandleBars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false, //Dont create a session until its stored
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static folder: public folder is use by anyone no need to define path
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
