const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// GET /users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password')
  res.json(users)
})

// GET /users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
})

// PATCH /users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ message: 'User not found' })

  const { name, email, password } = req.body
  if (name) user.name = name
  if (email) user.email = email
  if (password) user.password = await bcrypt.hash(password, 10)

  await user.save()
  res.json({ message: 'User updated', user })
})

// DELETE /users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ message: 'User not found' })

  await user.remove()
  res.json({ message: 'User deleted' })
})

module.exports = { getAllUsers, getUserById, updateUser, deleteUser }