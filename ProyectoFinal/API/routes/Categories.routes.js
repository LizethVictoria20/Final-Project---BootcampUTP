import express from 'express';
import Category from '../models/Category.js';
import CategorySchema from '../schemas/CategorySchema.js';


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = CategorySchema.parse(req.body);
    const newCategory = await Category.create(categoryData);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.errors });
  }
});

export default router;
