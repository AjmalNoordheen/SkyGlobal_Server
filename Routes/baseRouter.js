const express = require("express");
const router = express.Router();
const baseController = require("../Controller/baseController");
const auth = require("../Middleware/auth");

router.post("/submitSignup", baseController.handleSignUP);
router.post("/submitlogin", baseController.userLogin);
router.get("/homePage", auth.verifyToken, baseController.userDetails);
router.patch("/updateDetails", auth.verifyToken, baseController.updateDetails);

module.exports = router;
