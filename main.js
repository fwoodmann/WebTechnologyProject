const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const feedController = require("./controllers/feedController");
const profileController = require("./controllers/profileController");
const user = require("./models/user");
const methodOverride = require('method-override')


require('dotenv').config();
dbUrl = process.env.dbUrl ||"mongodb://localhost:27017/socialMedia_db"; 

const mongoose = require("mongoose");
const { Router } = require("express");
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

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
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

app.get("/profile", profileController.indexView);
app.get("/signup", profileController.new);
app.post("/signup",profileController.create, profileController.redirectView);

app.get("/profile/:id/edit", profileController.edit)
app.get("/profile/:id", profileController.show, profileController.showView);
app.put("/profile/:id/update", profileController.update, profileController.redirectView)

app.delete("/profile/:id/delete", profileController.delete, profileController.redirectView)

app.get("/feed", feedController.respondWebsite);
app.get("/", homeController.respondWebsite);
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${app.get("port")}`);
});