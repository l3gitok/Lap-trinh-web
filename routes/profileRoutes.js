const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../controllers/profileController');
const authenticate = require('../middlewares/authMiddleware');
router.get('/', authenticate, getProfile);
router.put('/', authenticate, updateProfile);

module.exports = router;