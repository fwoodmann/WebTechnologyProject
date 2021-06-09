const user = require("./models/user");
const methodOverride = require('method-override')
const expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash");
const expressValidator = require("express-validator"); //npm i express-validator@5.3.0 OTHERWISE THERE MIGHT BE ERRORS
const passport = require("passport");

require('dotenv').config();
dbUrl = process.env.dbUrl || "mongodb://localhost:27017/socialMedia_db";

const mongoose = require("mongoose");
const {
  Router
} = require("express");
mongoose.connect(
  dbUrl, {
    useNewUrlParser: true
  }, {
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});


const express = require("express"),
  path = require("path"),
  app = express(),
  layouts = require("express-ejs-layouts");

app.use(cookieParser("secres_passcode"));
app.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});


app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(expressValidator());
app.set("view engine", "ejs");

var port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.set("port", port);
app.use(layouts)

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/profileRoutes'));
app.use(require('./routes/homeRoutes'));
app.use(require('./routes/feedRoutes'));
app.use(require('./routes/errorRoutes'));

module.exports = app;




app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${app.get("port")}`);
});