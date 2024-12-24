const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, refreshToken, resetPassword, updatePassword } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshToken);
router.post('/reset-password', resetPassword);
router.post('/update-password', updatePassword);

module.exports = router;