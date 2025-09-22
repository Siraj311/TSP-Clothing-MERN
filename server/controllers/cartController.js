const asyncHandler = require('express-async-handler')
const Cart = require('../models/Cart')
const User = require('../models/User')

// GET /cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id
  
  let cart = await Cart.findOne({ user: userId }).populate('items.product')
  console.log(cart);
  
  if(!cart) return res.json({ items: [] })
  
  res.json(cart)
})

// POST /cart/addtocart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body

  if (!productId || !quantity) {
    return res.status(400).json({ message: "ProductId and quantity are required" });
  }

  let cart = await Cart.findOne({ user: req.user.id })
  if(!cart) {
    cart = new Cart({ user: req.user.id, items: [] })
  }

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
  if(itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity
  }else {
    cart.items.push({ product: productId, quantity })
  }

  await cart.save()
  res.json({ message: 'Item added to cart', cart })
})

// POST /cart/updateCart
const updateCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body
  if(!productId || !quantity) {
    return res.status(400).json({ message: 'ProductId and Quantity are required' })
  }

  let cart = await Cart.findOne({ user: req.user.id })
  if(!cart) return res.status(404).json({ message: 'Cart not found' })

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
  if(itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity
    await cart.save()
    return res.json({ message: 'Cart updated succesfully', cart })
  }
  
  res.status(404).json({ message: 'Item not found in cart' })
})

// POST /cart/removefromcart
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "ProductId is required" });
  }

  let cart = await Cart.findOne({ user: req.user.id })
  if(!cart) return res.status(404).json({ message: 'Cart not found' })

  cart.items = cart.items.filter(item => item.product.toString() !== productId)
  await cart.save()

  res.json({ message: "Item removed from cart", cart })
});

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart
}