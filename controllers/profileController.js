httpStatus = require('http-status-codes')
const passport = require('passport');
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
   
    let newUser = new User( getUserParams(req.body) );

    User.register(newUser, req.body.password, (error, user) => {
      if(user) {
        req.flash("success", `${user.username}'s account created successfully!`);
        res.locals.redirect = "/";
        next();
      } else { 
        req.flash("error", `Failed to create user account because: ${error.message}.`)
        res.locals.redirect = "/signup";
        next();
      }
    })
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

  authenticate: passport.authenticate("local", {
    failureRedirect: "/",
    faliureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
  }),

  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  },
  
  validate: (req, res, next) => {
    req.sanitizeBody("email").normalizeEmail({
      all_lowercase: true
    }).trim();
    req.check("email", "Email is invalid").isEmail();
    req.check("password", "Password is to short!").notEmpty().isLength({min: 4}).equals(req.body.password);

    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/signup";
        next();
      } else {
        next();
      }
    });
  },

}