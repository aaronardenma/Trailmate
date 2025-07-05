const express = require('express');
const router = express.Router();
const Gear = require('../models/gear');

router.get('/', async (req, res) => {
  try {
    const gear = await Gear.find({});
    res.json(gear);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load gear data', error });
  }
});

module.exports = router;