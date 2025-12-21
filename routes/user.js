const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");
const { render } = require("ejs");
const user = require("../models/user");


router.get("/signup", userController.renderSignup);


router.post("/signup",userController.signup);


router.get("/login", userController.renderLogin);

// POST Login
// ------------------------
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

// GET Logout
router.get("/logout", userController.logout);



module.exports = router;
