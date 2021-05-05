const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const feedController = require("./controllers/feedController");
const profileController = require("./controllers/profileController");
const user = require("./models/user");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/socialMedia_db",
  {useNewUrlParser: true}
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

app.get("/feed", feedController.respondWebsite);
app.get("/profile", profileController.respondWebsite);
app.get("/profile/:id", profileController.respondWebsite);
app.get("/", homeController.respondWebsite);
app.post("/sign_up", homeController.userSignUpProcessor);
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${app.get("port")}`);
});