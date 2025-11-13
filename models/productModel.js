const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true, default: 0 },
  stockQuantity: { type: Number, required: true, default: 0 },
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
