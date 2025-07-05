const express = require('express');
const router = express.Router();
const Tag = require('../models/tags');

router.get('/', async (req, res) => {
  try {
    const tag = await Tag.find({});
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load gear data', error });
  }
});

module.exports = router;