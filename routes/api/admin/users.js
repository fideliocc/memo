const express = require("express");
const router = express.Router(); // Route in server.js
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
const passportadmin = require("passport");

// Load input validation
const validateRegisterInput = require("../../../validation/register");
const validateLoginInput = require("../../../validation/login");

// Bcrypt for password hash
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../../../models/Superuser");

// @route   GET api/admin/users/test
// @desc    Test API Admin
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Superuser works!" });
});

// @route   POST api/admin/users/register
// @desc    Register an superuser
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Este usuario está registrado" });
    } else {
      // Creating the user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hashing the password with bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/admin/users/login
// @desc    Login superuser / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: "Usuario no registrado" });
    } else {
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched, create JWT payload
          const payload = { id: user.id, name: user.name };

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ password: "Contraseña incorrecta" });
        }
      });
    }
  });
});

// @route   GET api/admin/users/current
// @desc    Return current superuser
// @access  Private
router.get(
  "/current",
  passportadmin.authenticate("jwt-admin", { session: false }),
  (req, res) => {
    // res.json({ msg: "Success!" });
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
