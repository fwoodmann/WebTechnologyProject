const router = require("express").Router(),
  homeController = require("../controllers/homeController");


router.get("/", homeController.respondWebsite);

module.exports = router;