const express = require('express');
const router = express.Router();
const { 
  getUserProfile, 
  updateUserProfile, 
  deleteAccount,
  resetPassword,
  getUserByUsername,
  getUserById,
  generateOtp,
  verifyOtp,
  verifyEmail 
} = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.delete('/account', authenticate, deleteAccount);
router.post('/verify-email', authenticate, verifyEmail);
router.post('/reset-password', resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.get('/user/:id',authenticate, getUserById);
router.get('/:username',authenticate, getUserByUsername);
router.post('/generate-otp',authenticate, generateOtp);
router.post('/verify-otp', authenticate,verifyOtp);


module.exports = router;