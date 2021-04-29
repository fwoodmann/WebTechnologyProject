exports.logRequestPaths = (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
   };

exports.userSignUpProcessor = (req, res) => {
    res.send("Contact information submitted successfully.");
   };