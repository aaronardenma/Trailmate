const express = require('express');
const router = express.Router();
const Trail = require('../models/Trails');

router.get('/getTrails', async (req, res) => {
    try {
        const items = await Trail.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/addTrail', async (req, res) => {
    console.log("here")
    const {
        name,
        latitude,
        longitude,
        city,
        description,
        elevation,
        weather,
        tags,
        difficulty,
        distance
    } = req.body;

    const newTrail = new Trail({
        name,
        latitude,
        longitude,
        city,
        description,
        elevation,
        weather,
        tags,
        difficulty,
        distance
    });

    try {
        await newTrail.save();
        res.status(201).json({ message: 'Trail added successfully', trail: newTrail });
    } catch (err) {
        res.status(500).json({ error: 'Error adding trail', details: err });
    }
});

module.exports = router;


module.exports = router;