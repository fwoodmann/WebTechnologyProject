httpStatus = require('http-status-codes')
const User = require("../models/user");

const getUserParams = body => {
  return {
    name: {
      first: body.first || (body.name && body.name.first),
      last: body.last || (body.name && body.name.last)
    },
    username: body.username,
    email: body.email,
    password: body.password
  }
}

module.exports = {
  index: (req, res) => {
    User.find({})
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      })
  },
  indexView: (req, res) => {
    res.render("profile");
  },

  new: (req, res) => {
    res.render("signup");
  },
  create: (req, res, next) => {
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/profile";
        res.local.user = user;
        next();
      }).catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
}