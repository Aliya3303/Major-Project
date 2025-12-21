const User = require("../models/user");

module.exports.renderSignup = async(req, res) => {
  res.render("users/signup");
}

module.exports.signup = async(req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", `🎉 Welcome to Wanderlust ${req.user.username}!`);
      res.redirect("/listings");
    });

  } catch (err) {
    if (err.name === "UserExistsError") {
      req.flash("error", "Username already exists. Choose another username.");
      return res.redirect("/signup");
    }
    console.log(err);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/signup");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login.ejs")
};

module.exports.login=(req, res) => {
    req.flash("success", `✨ Welcome back to Wanderlust
      , ${req.user.username}!`);
    res.redirect(res.locals.redirectUrl || "/listings"); // Redirect to listings after login
  };

  module.exports.logout=(req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "👋 You have successfully logged out. See you soon!");
    res.redirect("/login");
  });
};