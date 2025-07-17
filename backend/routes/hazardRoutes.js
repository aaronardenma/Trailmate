const Hazards = require("../models/hazard");
const express = require('express');
const router = express.Router();


router.get('/getAllHazards/', async (req, res) => {
    try {
        const trails = await Hazards.find({ userId: req.user.id });
        res.status(200).json(trails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/isHazard', async (req, res) => {
    const { trailID, description, latitude, longitude, level } = req.body;

    if (!trailID || !latitude || !longitude) {
        return res.status(400).json({ error: 'trailID and location of hazard is required' });
    }

    const newHazard = new Hazards({
        trailID,
        description,
        latitude,
        longitude,
        level,
        dateOfPost: new Date(),
    });

    try {
        await newHazard.save();
        res.status(201).json({message: 'Hazard was created successfully', post: newPost});
    } catch (err) {
        res.status(500).json({error: 'Error creating hazard', details: err.message});
    }
});
