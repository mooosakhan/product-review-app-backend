const Product = require("../models/Product");
const Review = require("../models/Review");
const updateAverageRating = require("../utils/calculateAverageRating");

exports.getProducts = async (req, res) => {
  try {
    const minRating = parseFloat(req.query.minRating) || 0; // Get ?minRating from query

    const products = await Product.find();

    const productsWithAvg = await Promise.all(
      products.map(async (prod) => {
        const reviews = await Review.find({ product: prod._id });
        const avgRating = reviews.length
          ? (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)
          : 0;

        return {
          ...prod.toObject(),
          averageRating: Number(avgRating),
        };
      })
    );

    // 🟡 Filter based on minRating
    const filtered = productsWithAvg.filter(
      (p) => p.averageRating >= minRating
    );

    res.json(filtered);
  } catch (err) {
    console.error("getProducts error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get single product with populated reviews and calculated averageRating
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // 🟡 Get all reviews for this product
    const reviews = await Review.find({ product: product._id }).populate(
      "user",
      "name"
    );

    // 🟡 Properly calculate average
    let avgRating = 0;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      avgRating = (totalRating / reviews.length).toFixed(1); // 👈 To 1 decimal
    }

    // 🟡 Return product data + averageRating + reviews
    res.json({
      ...product.toObject(),
      averageRating: Number(avgRating),
      reviews,
    });
  } catch (err) {
    console.error("Error in getProductById:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
