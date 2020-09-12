const express = require("express");
const router = express.Router();
const {
  ensureAuth,
  ensureGuest,
} = require("../../controllers/authentication/auth");

// GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login");
});

// GET /user
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    res.render("dashboard", { user: req.user });
  } catch (err) {
    console.error(err);
    res.send("error/500");
  }
});
module.exports = router;
