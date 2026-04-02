const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { authMiddleware } = require("../middleware/authMiddleware");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "FAILed TO FETCH CATEGORY" });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({
      name,
      description,
      user: req.user.id,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "FAILED TO FETCH CATEGORY" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "CATEGORY NOT FOUND" });
    }

    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "USER NOT AUTHORIZED" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "FAILED TO UPDATE CATEGORY" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "CATEGORY NOT FOUND" });
    }
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "USER NOT AUTHORIZED" });
    }

    await category.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "FAILED TO DELETE" });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
