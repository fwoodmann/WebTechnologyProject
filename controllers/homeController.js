exports.logRequestPaths = (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
   };

exoports.logPort = (req, res) => {
    res.send("Hello, Universe!");
  }

exports.userSignUpProcessor = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("Contact information submitted successfully.");
   };