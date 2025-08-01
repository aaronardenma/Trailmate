const express = require('express');
const router = express.Router();
const Hazard = require('../models/hazard');
const authenticateToken = require('../service/auth');

router.post('/add', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { tripId, trailId, latitude, longitude, level, type, comment } = req.body;
    console.log(req.body)

    if (!tripId || !latitude || !longitude || !level || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newHazard = new Hazard({
        tripId,
        trailId,
        userId,
        latitude,
        longitude,
        level,
        comment,
        type,
    });

    try {
        await newHazard.save();
        res.status(201).json({ message: 'Hazard added successfully', hazard: newHazard });
    } catch (err) {
        console.error('Error adding hazard:', err);
        res.status(500).json({ error: 'Error adding hazard', details: err.message });
    }
});

router.get('/get/:trailId', async (req, res) => {
    const { trailId } = req.params;

    try {
        const hazards = await Hazard.find({ trailId });
        res.status(200).json(hazards);
    } catch (err) {
        console.error('Error fetching hazards:', err);
        res.status(500).json({ error: 'Error fetching hazards', details: err.message });
    }
});


module.exports = router;
