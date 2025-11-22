const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,
  items: Array,
});

module.exports = mongoose.model("Cart", CartSchema);
