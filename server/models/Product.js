const mongoose = require('mongoose')

const VALID_SIZES = ['S', 'M', 'L', 'XL'];
const VALID_CATEGORIES = ['Men', 'Women', 'Kids'];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: VALID_CATEGORIES,
      required: true
    },
    size: {
      type: String,
      enum: VALID_SIZES,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Product', productSchema)