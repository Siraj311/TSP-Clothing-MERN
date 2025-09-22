const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

// POST /auth/signup
const createNewUser = asyncHandler(async (req, res) => {
    const { username, email, password, isAdmin } = req.body

    if(!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const check = await User.findOne({ email }).lean().exec()
    if(check) {
        return res.status(400).json({ success: false, errors: 'Existing email id' })
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    const user = new User({
      name: username,
      email,
      "password": hashedPwd,
      isAdmin
    })

    await user.save()
    const token = jwt.sign({ user: { id: user._id, "isAdmin": user.isAdmin  } }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(201).json({ message: `New user ${username} created`, token, user: {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  } })
})  

// POST /auth/login
const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findOne({ email }).exec()

    if(!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.status(401).json({ message: 'Unauthorized' })

    const token = jwt.sign({ user: { id: user._id, isAdmin: user.isAdmin  } }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ message: 'User Authenticated Successfully', token, user: {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  } })
}) 


module.exports = {
  createNewUser,
  authenticateUser
}