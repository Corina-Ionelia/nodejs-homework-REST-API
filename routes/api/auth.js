const express = require('express');
const { registerUser, verifyUser, resendVerificationEmail } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:verificationToken', verifyUser);
router.post('/verify', resendVerificationEmail);

module.exports = router;