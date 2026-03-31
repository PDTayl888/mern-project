const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const ChannelCategory = require('../models/Category');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', protect, async (req, res) => {
  try {