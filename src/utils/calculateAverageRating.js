// utils/calculateAverageRating.js
const Review = require("../models/Review");
const Product = require("../models/Product");

const updateAverageRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  if (reviews.length === 0) {
    await Product.findByIdAndUpdate(productId, { averageRating: 0 });
    return;
  }

  const average =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(productId, {
    averageRating: average.toFixed(1),
  });
};

module.exports = updateAverageRating;
