httpStatus = require('http-status-codes')
const User = require("../models/user");

const getUserParams = body => {
  return {
    name: {
      first: body.first,
      last: body.last
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
    res.render("profile/index");
  },

  new: (req, res) => {
    res.render("signup");
  },
  create: (req, res, next) => {
    let userParams = getUserParams(req.body)

    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/profile";
        res.locals.user = user;
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
  },

  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
          next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID:${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("profile/index");
  },

  edit: (req, res, next) => {
    const userId = req.params.id
    User.findById(userId)
      .then(user => {
        res.render('profile/edit', {
          user: user
        })
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`)
        next(error)
      })
  },

  update: (req, res, next) => {
    const userId = req.params.id
    const userParams = getUserParams(req.body)

    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
      .then(user => {
        res.locals.redirect = `/profile/${userId}`
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`)
        next(error)
      })
  },

}