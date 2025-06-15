const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createReview,
  updateReview,
  deleteReview,
  getProductReviews
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getProductReviews)
  .post(protect, createReview);

router.route('/:reviewId')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
