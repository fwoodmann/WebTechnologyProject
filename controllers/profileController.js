const User = require("../models/user");
exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
};

exports.respondWebsite = (req, res) => {
  res.render("profile", {
    id: req.params.id,
  });
}

exports.renderSignUp = (req, res) => {
  res.render("signup", {
    id: req.params.id,
  });
};

exports.getSignUpPage = (req, res) => {
  res.render("signup");
};

exports.saveUser = (req, res) => {
  let newUser = new user({
    username: req.body.username,
    email: req.body.email
  });
};

exports.signUpUser = (req, res) => {
  let newUser = new User({
    id: req.params.id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save().then(() => {
    res.render("index");
  }).catch(error => {
    res.send(error);
  });
};