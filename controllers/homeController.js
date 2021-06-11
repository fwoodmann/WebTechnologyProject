exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
};

exports.respondWebsite = (req, res) => {
  if (req.query.format === "json") {
    res.json("Json Test");
  } else {
    res.render("index");
  }
}

exports.userSignUpProcessor = (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("Contact information submitted successfully.");
};