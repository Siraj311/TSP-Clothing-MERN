const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// POST /cart/addtocart
const addToCart = asyncHandler(async (req, res) => {
  const { itemId } = req.body

  if (!itemId) {
    return res.status(400).json({ message: "Item ID is required" });
  }

  await User.findOneAndUpdate(
    { _id: req.user.id },
    { $inc: { [`cartData.${itemId}`]: 1 } }
  );

  res.json({ message: 'Item added to cart' })
})

// POST /cart/removefromcart
const removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).json({ message: "Item ID is required" });
  }

  await User.findOneAndUpdate(
    { _id: req.user.id, [`cartData.${itemId}`]: { $gt: 0 } }, // only if qty > 0
    { $inc: { [`cartData.${itemId}`]: -1 } }
  )

  res.json({ message: "Item removed from cart" })
});

module.exports = {
  addToCart
}