

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/api/cart/add', async (req, res) => {
  const { email, food } = req.body;

  if (!email || !food || !food.foodId || !food.name || !food.image || !food.cost) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    const cost = parseFloat(food.cost);
    const quantity = parseInt(food.quantity, 10) || 1;

    if (isNaN(cost) || isNaN(quantity)) {
      return res.status(400).json({ message: 'Invalid cost or quantity' });
    }

    const existingItemIndex = user.cartItems.findIndex(item => item.foodId === food.foodId);

    if (existingItemIndex >= 0) {
     
      user.cartItems[existingItemIndex].quantity += quantity;
      user.cartItems[existingItemIndex].total = user.cartItems[existingItemIndex].cost * user.cartItems[existingItemIndex].quantity;
    } else {
  
      user.cartItems.push({
        foodId: food.foodId,
        name: food.name,
        image: food.image,
        cost: cost,
        quantity: quantity,
        total: cost * quantity
      });
    }


    user.grandTotal = user.cartItems.reduce((total, item) => total + item.total, 0);

    await user.save();
    res.status(200).json({ message: 'Item added to cart', cartItems: user.cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.delete('/api/cart/remove', async (req, res) => {
    const { email, foodId } = req.body;
  
    if (!email || !foodId) {
      return res.status(400).json({ message: 'Invalid data' });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const updatedCartItems = user.cartItems.filter(item => item.foodId !== foodId);

      user.grandTotal = updatedCartItems.reduce((total, item) => total + item.total, 0);
  

      user.cartItems = updatedCartItems;
      
      await user.save();
      res.status(200).json({ message: 'Item removed from cart', cartItems: user.cartItems });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


router.patch('/api/cart/increment', async (req, res) => {
    const { email, foodId } = req.body;
  
    if (!email || !foodId) {
      return res.status(400).json({ message: 'Invalid data' });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const itemIndex = user.cartItems.findIndex(item => item.foodId === foodId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
 
      user.cartItems[itemIndex].quantity += 1;
      user.cartItems[itemIndex].total = user.cartItems[itemIndex].cost * user.cartItems[itemIndex].quantity;
  

      user.grandTotal = user.cartItems.reduce((total, item) => total + item.total, 0);
  
      await user.save();
      res.status(200).json({ message: 'Item quantity updated', cartItems: user.cartItems });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  router.patch('/api/cart/decrement', async (req, res) => {
    const { email, foodId } = req.body;
  
    if (!email || !foodId) {
      return res.status(400).json({ message: 'Invalid data' });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const itemIndex = user.cartItems.findIndex(item => item.foodId === foodId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  

      if (user.cartItems[itemIndex].quantity > 1) {
        user.cartItems[itemIndex].quantity -= 1;
      }
      user.cartItems[itemIndex].total = user.cartItems[itemIndex].cost * user.cartItems[itemIndex].quantity;
  

      user.grandTotal = user.cartItems.reduce((total, item) => total + item.total, 0);
  
      await user.save();
      res.status(200).json({ message: 'Item quantity updated', cartItems: user.cartItems });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




router.get('/api/cartitems', authMiddleware, async (req, res) => {
  try {
   
    const userId = req.user.userId;

   
    const user = await User.findById(userId).select('cartItems');

   
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.json(user.cartItems);
  } catch (error) {
   
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
  
  

  module.exports = router;


