const router = require("express").Router(),
  profileController = require("../controllers/profileController");

app.get("/", profileController.login);
app.post("/", profileController.authenticate, profileController.redirectView)
app.get("/profile/logout", profileController.logout, profileController.redirectView);

app.delete("/profile/:id/delete", profileController.delete, profileController.redirectView)

module.exports = router;