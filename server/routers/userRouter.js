const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/verify/:userId/:uniqueString", userController.verifyRegistration);
///verify/" + id + "/" + uniqueString
module.exports = router;
