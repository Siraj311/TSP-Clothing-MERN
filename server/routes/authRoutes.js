const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/signup', authController.createNewUser)
router.post('/login', authController.authenticateUser)

module.exports = router