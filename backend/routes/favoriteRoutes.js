const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');

router.get('/getFavoriteTrails/:userId', async (req, res) => {
    try {
        const trails = await Favorite.find({ userId: req.params.userId });
        res.status(200).json(trails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/isFavorite', async (req, res) => {

    const { userId, trailID } = req.body;
    console.log(trailID)
    try {
        const trails = await Favorite.find({ userId: userId });
        let isFavorite = false;
        for (let t of trails){
            const t_id = t.trailID
            if (t_id === trailID){
                isFavorite = true
            }
        }
        res.status(200).json({ isFavorite: isFavorite });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/addFavorite', async (req, res) => {
    const { userId, trailID } = req.body;

    if (!userId || !trailID) {
        return res.status(400).json({ error: 'userId and trailID are required' });
    }

    try {
        const existing = await Favorite.findOne({ userId, trailID });
        if (existing) {
            return res.status(409).json({ message: 'Trail is already in favorites' });
        }

        const favorite = new Favorite({ userId, trailID });
        await favorite.save();

        res.status(201).json({ message: 'Favorite added successfully', favorite });
    } catch (err) {
        res.status(500).json({ error: 'Error adding favorite', details: err.message });
    }
});

router.delete('/deleteFavorite', async (req, res) => {

    const { userId, trailID } = req.body;
    console.log(userId)
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
