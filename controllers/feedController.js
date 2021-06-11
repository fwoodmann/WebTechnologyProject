exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
};

exports.respondWebsite = (req, res) => {
  res.render("feed");
};

exports.respondJSON = (req, res) => {
  res.json({
    status: httpStatus.OK,
    data: res.locals
  });
};
exports.errorJSON = (error, req, res, next) => {
  let errorObject;
  if (error) {
    errorObject = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    };
  } else {
    errorObject = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Unknown Error."
    };
  }
  res.json(errorObject);
}