const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.productId;
  const userId = req.user._id;

  const alreadyReviewed = await Review.findOne({
    user: userId,
    product: productId,
  });
  if (alreadyReviewed) {
    return res
      .status(400)
      .json({ message: "You already reviewed this product" });
  }

  const review = await Review.create({
    user: userId,
    product: productId,
    rating,
    comment,
  });
  res.status(201).json(review);
};
// routes/reviews.js or in your controller
// src/controllers/reviewController.js
exports.updateReview = async (req, res) => {
  const { productId, reviewId } = req.params;
  const { rating, comment } = req.body;

  // 1) Fetch the review document
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }

  // 2) Check it belongs to the right product
  if (review.product.toString() !== productId) {
    return res
      .status(400)
      .json({ error: "Review does not belong to this product" });
  }

  // 3) Authorization
  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: "You can only edit your own review" });
  }

  // 4) Update & save
  review.rating = rating;
  review.comment = comment;
  await review.save();

  res.json({ message: "Review updated successfully" });
};

exports.deleteReview = async (req, res) => {
  const { productId, reviewId } = req.params;

  // 1) Fetch the review
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }

  // 2) Ensure the review belongs to the correct product
  if (review.product.toString() !== productId) {
    return res
      .status(400)
      .json({ error: "Review does not belong to this product" });
  }

  // 3) Authorization check
  if (review.user.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ error: "You can only delete your own review" });
  }

  // 4) Delete it (fix here)
  await Review.findByIdAndDelete(reviewId);

  res.json({ message: "Review deleted successfully" });
};

exports.getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate(
    "user",
    "name"
  );
  res.json(reviews);
};
