const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/allusers.js");

sessions.get("/new", (req, res) => {
  res.render("sessions/session_new.ejs", {
    currentUser: req.session.currentUser,
  });
});

sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send("oh no....");
    } else if (!foundUser) {
      res.send('<a  href="/">Sorry, no user found </a>');
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser;
        // redirect back to our home page
        res.redirect("/");
      } else {
        // passwords do not match
        res.send('<a href="/"> password does not match </a>');
      }
    }
  });
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessions;
