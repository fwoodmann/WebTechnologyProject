exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
 };

exports.respondWebsite = (req, res) => {
  res.render("feed");
}