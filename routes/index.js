const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
// @desc Login/Landing Page
// @route GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});
// @desc DashBoard
// @route GET /dashboard
router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard", {
    name: req.user.firstName,
  });
});

module.exports = router;

//Aim - ensureAuth ke fir se login karne ke jarurut nah pade
//Aim - ensureGuest ensures that guest login page pe he rahe even if try to go dashboard
//Problem - agr server band karke frr se chalenge toh already login wale kick out hojaeyge
//Solution - session store karna padega database meh so agr server restart bhi ho toh login user logout nah ho automatically
