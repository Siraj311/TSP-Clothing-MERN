const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

// GET /products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// Post /products
const addProduct = asyncHandler(async (req, res) => {
    const { name, description, image, category, size, price } = req.body

    if(!name || !image || !category || !size || !price) {
      return res.status(400).json({ message: 'All required fields must be provided' })
    }

    const product = new Product({
      name,
      description,
      image, 
      category,
      size,
      price,
    }) 

    console.log(product)
    await product.save()
    console.log("Saved")
    res.json({
      success: true,
      name
    })
    
})

// PATCH /products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name, description, price, category, size, image, available } = req.body

  // Find product
  let product = await Product.findById(id)
  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  // Update fields only if provided
  if (name) product.name = name
  if (description) product.description = description
  if (price) product.price = price
  if (category) product.category = category
  if (size) product.size = size
  if (image) product.image = image
  if (typeof available === "boolean") product.available = available

  await product.save()
  console.log("Product updated:", product)

  res.json({
    success: true,
    product
  })
})

// Delete /products/:id
const removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }
  console.log("Removed:", product.name)
  res.json({ success: true, product })
})

module.exports = { 
  getAllProducts,
  addProduct,
  updateProduct,
  removeProduct
}