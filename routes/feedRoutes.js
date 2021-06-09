const router = require("express").Router(),
  feedController = require("../controllers/feedController");

router.get("/feed", feedController.respondWebsite);

module.exports = router;