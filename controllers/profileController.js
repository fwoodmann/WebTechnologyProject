
exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
 };

exports.respondWebsite = (req, res) => {
  let userId = req.params.id; 
  res.render("profile",{id: userId});
}