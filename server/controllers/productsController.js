const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')


// GET /products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// Post /products/addproduct
const addproduct = asyncHandler(async (req, res) => {
    let products = await Product.find({}) // find all products

    let id
    if(products.length > 0) {
      let last_product_array = products.slice(-1)
      let last_product = last_product_array[0]
      id = last_product.id + 1
    } else {
      id = 1
    }

    const { name, image, category, new_price, old_price } = req.body

    const product = new Product({
      id,
      name,
      image, 
      category,
      new_price,
      old_price
    }) 

    console.log(product)
    await product.save()
    console.log("Saved")
    res.json({
      success: true,
      name
    })
    
})

// Delete /products/removeproduct
const removeProduct = asyncHandler(async (req, res) => {
  const { id, name } = req.body
  const result = await Product.findOneAndDelete({ id }) // It does return the deleted product object

  console.log(result);
  console.log('Removed');
  res.json({
    success: true,
    name
  })
})

// GET /products/newcollections
const getNewCollections = asyncHandler(async (req, res) => {
  const newCollections = await Product.find({})
                                  .sort({ date: -1 })
                                  .limit(4)             
  console.log('New Collection Fetched')
  res.json(newCollections)
}) 

module.exports = { 
  getAllProducts,
  addproduct,
  removeProduct,
  getNewCollections
}