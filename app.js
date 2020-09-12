//.env Config
require("dotenv").config();

// Imports
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const MongoUser = require("connect-mongo")(session);

//Import all routes
const indexRoutes = require("./routes/index/index");
const authRoutes = require("./routes/authentication/auth");

//Port Config
const port = process.env.PORT || 8000;

//Passport Config
require("./config/passport/passport")(passport);

//ejs Config
app.set("view engine", "ejs");
app.set("views", "views");

//bodyParser MiddleWares
app.use(bodyParser.urlencoded({ extended: false }));

//MiddleWares Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { originalMaxAge: 60 * 60 * 1000 },
    store: new MongoUser({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//My Routes
app.use(indexRoutes);
app.use("/auth", authRoutes);

// Mongoose connect with MongodbAtlas
mongoose
  .connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((connected) => {
    app.listen(port, () => {
      console.log("Running on 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
