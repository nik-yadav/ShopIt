const express = require("express");
const router = express.Router();
const User = require("../models/user");

// MIDDLEWARES
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

// params
const { getUserById } = require("../controllers/user");
router.param("userID", getUserById);

//CONTROLLERS
const { makePayment } = require("../controllers/stripe");

// routes
router.post(
  "/pay/:userId",
  async (req, res, next) => {
    const id = req.params.userId;
    // console.log("userID = ", id);
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        err: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  },
  isSignedIn,
  isAuthenticated,
  makePayment
);

module.exports = router;
