const express = require('express');
const router = express.Router();
const Trail = require('../models/trails');

router.get('/getTrails', async (req, res) => {
    try {
        const items = await Trail.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getTrailById/:id', async (req, res) => {
    try {
        const trail = await Trail.findById(req.params.id);
        console.log(trail)
        if (!trail) {
            return res.status(404).json({ message: 'Trail not found' });
        }
        res.json(trail);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// router.delete('/deleteTrail/:id', async (req, res) => {
//     try {
//         const deletedTrail = await Trail.findByIdAndDelete(req.params.id);
//
//         if (!deletedTrail) {
//             return res.status(404).json({ message: 'Trail not found' });
//         }
//         res.status(200).json({ message: 'Trail deleted successfully', trail: deletedTrail });
//     } catch (err) {
//         res.status(500).json({ error: 'Error deleting trail', details: err.message });
//     }
// });



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
        distance,
        photoUrl
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
        distance,
        photoUrl
    });

    try {
        await newTrail.save();
        res.status(201).json({ message: 'Trail added successfully', trail: newTrail });
    } catch (err) {
        res.status(500).json({ error: 'Error adding trail', details: err });
    }
});

module.exports = router;
