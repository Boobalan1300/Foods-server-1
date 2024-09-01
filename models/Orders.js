// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   name: { type: String, required: true },
//   contact: { type: String, required: true },
//   address: { type: String, required: true },
//   orderId: { type: Number, required: true, unique: true },
//   cartItems: [{
//     foodId: { type: Number, required: true },
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     cost: { type: Number, required: true },
//     quantity: { type: Number, default: 1 },
//     total: { type: Number, default: function() { return this.cost * this.quantity; } }
//   }],
//   grandTotal: { type: Number, required: true }
// });

// module.exports = mongoose.model('Order', OrderSchema);


// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   name: { type: String, required: true },
//   contact: { type: String, required: true },
//   address: { type: String, required: true },
//   orderId: { type: Number, required: true, unique: true },
//   date: { type: Date, default: Date.now }, 
//   cartItems: [{
//     foodId: { type: Number, required: true },
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     cost: { type: Number, required: true },
//     quantity: { type: Number, default: 1 },
//     total: { type: Number, default: function() { return this.cost * this.quantity; } }
//   }],
//   grandTotal: { type: Number, required: true }
// });

// module.exports = mongoose.model('Order', OrderSchema);



const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  orderId: { type: Number, required: true, unique: true },
  date: { type: Date, default: Date.now }, 
  cartItems: [{
    foodId: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    total: { type: Number, default: function() { return this.cost * this.quantity; } }
  }],
  grandTotal: { type: Number, required: true },
  cancelExpiration: { type: Date, required: true, default: function() { return Date.now() + 10 * 60 * 1000; } }, 
  isCancelled: { type: Boolean, default: false }
});

module.exports = mongoose.model('Food-Order', OrderSchema);
