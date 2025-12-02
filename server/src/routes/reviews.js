const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProductReviews,
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  markHelpful,
} = require('../controllers/reviewController');

// Public routes
router.get('/', getAllReviews);
router.get('/product/:productId', getProductReviews);

// Protected routes
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.put('/:id/helpful', markHelpful);

module.exports = router;
