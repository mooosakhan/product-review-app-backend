const User = require('../models/User');

exports.addToWishlist = async (req, res) => {
  const user = req.user;
  const productId = req.params.productId;

  if (user.wishlist.includes(productId)) {
    return res.status(400).json({ message: 'Already in wishlist' });
  }
  user.wishlist.push(productId);
  await user.save();
  res.json({ wishlist: user.wishlist });
};

exports.removeFromWishlist = async (req, res) => {
  const user = req.user;
  const productId = req.params.productId;

  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();
  res.json({ wishlist: user.wishlist });
};

exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json(user.wishlist);
};
