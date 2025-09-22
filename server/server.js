require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500

connectDB()

app.use(express.json())
app.use(cors())

app.use('/auth', require('./routes/authRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/products', require('./routes/productRoutes'))
app.use('/cart', require('./routes/cartRoutes'))

app.get('/', (req, res) => {
  res.send('Express App is Running..')
})

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage })

// Creating upload image endpoint for images
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
      success: 1,
      image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

app.all(/.*/, (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')) {
      res.json({ message: '404 Not Found' })
    }else {
      res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})