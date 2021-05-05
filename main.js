const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const feedController = require("./controllers/feedController");
const profileController = require("./controllers/profileController");
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

app.get("/signup", profileController.getSignUpPage);
app.post("/profile", profileController.saveUser);

app.get("/feed", feedController.respondWebsite);
app.get("/profile", profileController.respondWebsite);
app.get("/profile/:id", profileController.respondWebsite);
app.get("/", homeController.respondWebsite);
app.post("/sign_up", homeController.userSignUpProcessor);
app.get("/signup", profileController.renderSignUp);
app.get("/signup:candidateid", profileController.renderSignUp);
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${app.get("port")}`);
});