const express = require("express");

const {
  setupAdmin,
  login,
  getMe,
  changeEmail,
  changePassword,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*
   FIRST ADMIN SETUP
   This only works while admins table is empty.
*/
router.post("/setup", setupAdmin);

/*
   LOGIN
*/
router.post("/login", login);

/*
   PROTECTED ROUTES
*/
router.get("/me", authMiddleware, getMe);

router.put(
  "/email",
  authMiddleware,
  changeEmail
);

router.put(
  "/password",
  authMiddleware,
  changePassword
);

module.exports = router;