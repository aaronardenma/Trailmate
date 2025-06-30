const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');
const authenticateToken = require("../service/auth")

router.get('/getFavoriteTrails/', authenticateToken, async (req, res) => {
    try {
        const trails = await Favorite.find({ userId: req.user.id });
        res.status(200).json(trails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/isFavorite', authenticateToken, async (req, res) => {
    const { trailID } = req.body;
    
    if (!trailID) {
        return res.status(400).json({ error: 'trailID is required' });
    }
    
    try {
        const favorite = await Favorite.findOne({ userId: req.user.id, trailID });
        const isFavorite = favorite !== null;
        
        res.status(200).json({ isFavorite });
    } catch (err) {
        console.error('Error checking favorite status:', err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/addFavorite', authenticateToken, async (req, res) => {
    const { trailID } = req.body;
    const userId = req.user.id;

    if (!trailID) {
        return res.status(400).json({ error: 'trailID are required' });
    }

    try {
        const existing = await Favorite.findOne({ userId, trailID });
        if (existing) {
            return res.status(409).json({ message: 'Trail is already in favorites' });
        }

        const favorite = new Favorite({ userId, trailID });
        await favorite.save();
        console.log('saved favourite')
        res.status(201).json({ message: 'Favorite added successfully', favorite });
    } catch (err) {
        res.status(500).json({ error: 'Error adding favorite', details: err.message });
    }
});

router.delete('/deleteFavorite', authenticateToken, async (req, res) => {

    const {trailID } = req.body;
    const userId = req.user.id
    console.log(trailID)

    if (!userId || !trailID) {
        return res.status(400).json({ error: 'userId and trailID are required' });
    }

    try {
        const deleted = await Favorite.findOneAndDelete({ userId, trailID });
        console.log(deleted)

        if (!deleted) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        res.status(200).json({ message: 'Favorite removed successfully', deleted });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting favorite', details: err.message });
    }
});

module.exports = router;
