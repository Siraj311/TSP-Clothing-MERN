const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const cartController = require('../controllers/cartController')

router.post('/addtocart', verifyJWT, cartController.addToCart)

module.exports = router