const jwt = require('jsonwebtoken')

const verifyJWT = async (req, res, next) => {
  const token = req.header('auth-token')
  if(!token) {
    return res.status(401).json({ errors: 'Please authenticate using valid token' })
  }

  try {
    const data = jwt.verify(token, 'secret_ecom') 
    req.user = data.user
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Please authenticate user' })
  }
  
  next()
}

module.exports = verifyJWT