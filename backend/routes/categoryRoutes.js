const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, protect, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'FAILed TO FETCH CATEGORY' });
  }
});

router.post('/', authMiddleware, protect, async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({
      name,
      description,
      user: req.user.id
    });
    
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'FAILED TO FETCH CATEGORY' });
  }
});

router.delete('/:id', authMiddleware, protect, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'CATEGORY NOT FOUND' });
    }
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'USER NOT AUTHORIZED' });
    }

    await category.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'FAILED TO DELETE' });
  }
});

module.exports = router;