const router = require("express").Router(),
  homeController = require("../controllers/homeController");


app.get("/", homeController.respondWebsite);

module.exports = router;