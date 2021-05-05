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