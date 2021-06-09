const router = require("express").Router(),
  errorController = require("../controllers/errorController");

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

module.exports = router;