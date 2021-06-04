httpStatus = require('http-status-codes')
const User = require("../models/user");

const getUserParams = body => {
  return {
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
        req.flash("success", `${user.username}'s account created successfully!`);
        res.locals.redirect = "/";
        res.locals.user = user;
        next();
      }).catch(error => {
        console.log(`Error saving user: ${error.message}`);
        res.locals.redirect = "/signup";
        req.flash(
          "error",
          `Failed to create user account because: ${error.message}.`
        );
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
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
        req.flash("success", `${user.username}'s account changes successfully!`)
        res.locals.redirect = `/profile/${userId}`
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`)
        next(error)
      })
  },

  delete: (req, res, next) => {
    const userId = req.params.id
    User.findByIdAndRemove(userId)
      .then(() => {
        req.flash("success", `${user.username}'s account deleted successfully!`);
        res.locals.redirect = "/"
        next()
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`)
       req.flash("error", `Failed to delete user account because: ${error.message}`)
        next()
      })
  },

  login: (req, res) => {
    res.render("/");
  },

  authenticate: (req, res, next) => {
    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (user && user.password === req.body.password) {
          res.locals.redirect = `/profile/${user._id}`;
          req.flash("success", `${user.username}'s logged in successfully!`);
          res.locals.user = user;
          next();
        } else {
          req.flash("error", "Your email or password is incorrect. Please try again!");
          res.locals.redirect = "/";
          next()
        }
      })
      .catch(error => {
        console.log(`Error logging in user: ${error.message}`);
        next(error);
      });
  }

}