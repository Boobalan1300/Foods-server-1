

const express = require('express');
const router = express.Router();
const Food = require('../models/Products'); 
const authMiddleware = require('../middleware/authMiddleware');


router.post('/api/foods', async (req, res) => {
  const { name, image, cost } = req.body;

  if (!name || !image || !cost) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const generateUniqueId = () => {
      return Math.floor(1000 + Math.random() * 9000);
    };

    let foodId = generateUniqueId();
    let existingFood = await Food.findOne({ foodId });

    while (existingFood) {
      foodId = generateUniqueId();
      existingFood = await Food.findOne({ foodId });
    }

    const newFood = new Food({ name, image, cost, foodId });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    console.error('Error occurred:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});



router.get('/api/foods', authMiddleware, async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});



router.delete('/api/foods/:foodId', authMiddleware, async (req, res) => {
  try {
      const { foodId } = req.params;
      await Food.deleteOne({ foodId: Number(foodId) });
      res.status(200).json({ message: 'Food deleted successfully.' });
  } catch (err) {
      res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/api/foods/:foodId', authMiddleware, async (req, res) => {
  try {
      const { foodId } = req.params;
      const updatedData = req.body;

      const food = await Food.findOneAndUpdate({ foodId: Number(foodId) }, updatedData, { new: true });

      if (!food) {
          return res.status(404).json({ message: 'Food not found' });
      }

      res.status(200).json({ message: 'Food updated successfully', food });
  } catch (err) {
      res.status(500).json({ message: 'Server Error' });
  }
})



module.exports = router;
