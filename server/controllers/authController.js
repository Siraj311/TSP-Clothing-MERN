const User = require('../models/User')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// POST /auth/signup
const createNewUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const check = await User.findOne({ email })
    if(check) {
        return res.status(400).json({ success: false, errors: 'Existing email id' })
    }

    let cart = {}
    for(let i = 0; i < 300; i++) {
      cart[i] = 0
    }

    const user = new User({
      name: username,
      email,
      password,
      cartData: cart
    })

    await user.save()

    const data = {
      user: {
        id: user.id
      }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({ success: true, token })
})  

// POST /auth/login
const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user) {
      const passCompare = password === user.password
      if(passCompare) {
        const data = {
            user: {
              id: user.id
            }
        } 
        const token = jwt.sign(data, 'secret_ecom')
        return res.json({ success: true, token })
      }else {
        return res.json({ success: false, errors: 'Wrong Password' })
      }
    }else {
      res.json({ success: false, errors: 'Wrong Email Id' })
    }
}) 


module.exports = {
  createNewUser,
  authenticateUser
}