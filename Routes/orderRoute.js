






const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/api/orders', async (req, res) => {
  try {
   
    const order = new Order(req.body);
    await order.save();
    
   
    const userEmail = req.body.profileEmail;
   
    if (!userEmail) {
      return res.status(400).json({ message: 'User email is required to clear cart items' });
    }
    
    
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.cartItems = []; 
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ message: 'Failed to create order', error });
  }
});



//all orders_ for-admin

  router.get('/api/orders', authMiddleware, async (req, res) => {
    try {
      const orders = await Order.find({ profileEmail: req.email });
  
      const updatedOrders = orders.map(order => {
        const timeLeft = Math.max(0, (new Date(order.cancelExpiration) - new Date()) / 1000);
        return { 
          ...order.toObject(), 
          timeLeft, 
          canCancel: !order.isCancelled && timeLeft > 0 
        };
      });
  
      res.status(200).json(updatedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders', error });
    }
  });


  //repective orders

router.get('/api/particular/orders', authMiddleware, async (req, res) => {
    try {
      const { email } = req.query; 
   
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
  
      const orders = await Order.find({ email }); 
     
  
      const updatedOrders = orders.map(order => {
        const timeLeft = Math.max(0, (new Date(order.cancelExpiration) - new Date()) / 1000);
        return { 
          ...order.toObject(), 
          timeLeft, 
          canCancel: !order.isCancelled && timeLeft > 0 
        };
      });
  
      res.status(200).json(updatedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders', error });
    }
  });
  
  
  
  

//cancel

  router.delete('/api/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await Order.findOneAndDelete({ orderId });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// from admin

  router.delete('/api/orders/delete/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findOneAndDelete({ orderId: Number(orderId) });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  


  module.exports = router;