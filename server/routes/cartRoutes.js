const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const cartController = require('../controllers/cartController')

router.get('/', verifyJWT, cartController.getCart)
router.post('/addtocart', verifyJWT, cartController.addToCart)
router.post('/updatecart', verifyJWT, cartController.updateCart)
router.post('/removefromcart', verifyJWT, cartController.removeFromCart)

module.exports = router