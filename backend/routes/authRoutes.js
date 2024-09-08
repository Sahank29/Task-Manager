const express = require("express");
const {
    registerUser,
    loginUser, googleUser
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/register-google", googleUser)

module.exports = router;