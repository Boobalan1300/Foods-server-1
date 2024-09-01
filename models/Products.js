


const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  cost: { type: Number, required: true },
  foodId: { type: Number, required: true },
  quantity: { type: Number, default: 1 }, 
  total: { type: Number, default: function() { return this.cost * this.quantity; } }
});

const Food = mongoose.model('Food-Prducts', foodSchema);

module.exports = Food;
