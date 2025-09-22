const express = require('express')
const router = express.Router()
const adminOnly = require('../middleware/adminOnly')
const verifyJWT = require('../middleware/verifyJWT')
const productsController = require('../controllers/productsController')

router.get('/', verifyJWT, adminOnly, productsController.getAllProducts)
router.post('/', verifyJWT, adminOnly, productsController.addProduct)
router.patch('/:id', verifyJWT, adminOnly, productsController.updateProduct)
router.delete('/:id', verifyJWT, adminOnly, productsController.removeProduct)

module.exports = router