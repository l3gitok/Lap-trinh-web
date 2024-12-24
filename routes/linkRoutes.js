const express = require('express');
const router = express.Router();
const {
  addLink,
  getUserLinks,
  updateLink,
  deleteLink,
  getLinkByUserId,
  trackLinkClick
} = require('../controllers/linkController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/user/:userId',authenticate, getLinkByUserId); // Ensure this route is correct
router.post('/', authenticate, addLink);
router.get('/', authenticate, getUserLinks);
router.put('/:id', authenticate, updateLink);
router.delete('/:id', authenticate, deleteLink);
router.post('/track/:id', trackLinkClick);

module.exports = router;