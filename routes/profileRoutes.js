const router = require("express").Router(),
  profileController = require("../controllers/profileController");


//router.get("/", profileController.login);
router.post("/", profileController.authenticate, profileController.redirectView)
router.get("/profile/logout", profileController.logout, profileController.redirectView);

router.get("/profile", profileController.indexView);
router.get("/signup", profileController.new);
router.post("/signup", profileController.validate, profileController.create, profileController.redirectView);

router.get("/profile/:id/edit", profileController.edit)
router.get("/profile/:id", profileController.show, profileController.showView);
router.put("/profile/:id/update", profileController.update, profileController.redirectView)

router.delete("/profile/:id/delete", profileController.delete, profileController.redirectView)

module.exports = router;