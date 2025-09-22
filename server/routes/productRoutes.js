const express = require('express')
const router = express.Router()
const adminOnly = require('../middleware/adminOnly')
const verifyJWT = require('../middleware/verifyJWT')
const productsController = require('../controllers/productsController')

router.get('/', adminOnly, verifyJWT, productsController.getAllProducts)
router.post('/', adminOnly, verifyJWT, productsController.addProduct)
router.patch('/:id', adminOnly, verifyJWT, productsController.updateProduct)
router.delete('/:id', adminOnly, verifyJWT, productsController.removeProduct)

module.exports = router