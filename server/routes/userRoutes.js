const express = require('express')
const verifyJWT = require('../middleware/verifyJWT')
const router = express.Router()
const usersController = require('../controllers/usersController')
const adminOnly = require('../middleware/adminOnly')

router.get('/', verifyJWT, adminOnly, usersController.getAllUsers)
router.get('/:id', verifyJWT, usersController.getUserById)
router.patch('/:id', verifyJWT, usersController.updateUser)
router.delete('/:id', verifyJWT, usersController.deleteUser)

module.exports = router