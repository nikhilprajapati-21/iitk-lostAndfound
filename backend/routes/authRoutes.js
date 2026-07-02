const express = require("express");

const router = express.Router();

const {
    sendOTP,
    verifyOTP,
    completeProfile,
} = require("../controllers/authController");

// Send OTP
router.post("/send-otp", sendOTP);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Complete Profile
router.post("/complete-profile", completeProfile);

module.exports = router;