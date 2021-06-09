const router = require("express").Router(),
  feedController = require("../controllers/feedController");

app.get("/feed", feedController.respondWebsite);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = router;