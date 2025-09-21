const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router.get('/allproducts', productsController.getAllProducts)
router.post('/addproduct', productsController.addproduct)
router.delete('/removeproduct', productsController.removeProduct)
router.get('/newcollections', productsController.getNewCollections)

module.exports = router