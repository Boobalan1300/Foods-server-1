



const mongoose = require('mongoose');
const Food = require('../models/Products');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  address: { type: String },
  contact: { type: String },
  cartItems: [{
    foodId: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, default: 1 }, 
    total: { type: Number, default: function() { return this.cost * this.quantity; } }
  }],
  grandTotal: { type: Number, default: 0 },
});

module.exports = mongoose.model('Food-Users', UserSchema);
