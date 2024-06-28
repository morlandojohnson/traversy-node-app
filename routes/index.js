const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Story = require("../models/Story");

// Description: Login/Landing Page
// Route     GET /

router.get("/", ensureGuest, (req, res) => {
  res.render("Login", {
    layout: "login",
  });
});

// Description: Dashboard
// Route     GET /dashboard

router.get("/dashboard", ensureAuth, async (req, res) => {
  console.log(req.user);
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("Dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
