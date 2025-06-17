const express = require('express');
const router = express.Router();
const Trip = require('../models/Trips');
const mongoose = require('mongoose');

router.get('/getTripsForUser/:userId', async (req, res) => {
    try {
        const trips = await Trip.find({ userId: req.params.userId });
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getUsersForTrip/:trailId', async (req, res) => {
    try {
        const trips = await Trip.find({ trailID: req.params.trailId });
        const userIds = trips.map(trip => trip.userId);
        res.status(200).json(userIds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getTripsForDate/:date', async (req, res) => {
    try {
        const targetDate = new Date(req.params.date);
        const nextDate = new Date(targetDate);
        nextDate.setDate(nextDate.getDate() + 1);

        const trips = await Trip.find({
            dateOfTrip: {
                $gte: targetDate,
                $lt: nextDate
            }
        });

        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getTripsBetweenDates', async (req, res) => {
    const { start, end } = req.query;

    if (!start || !end) {
        return res.status(400).json({ error: "Start and end dates are required" });
    }

    try {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const trips = await Trip.find({
            dateOfTrip: {
                $gte: startDate,
                $lte: endDate
            }
        });

        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/addTrip', async (req, res) => {
    const { userId, trailID, dateOfTrip, userRating, userComments } = req.body;

    const newTrip = new Trip({
        userId,
        trailID,
        dateOfTrip,
        userRating,
        userComments
    });

    try {
        await newTrip.save();
        res.status(201).json({ message: 'Trip added successfully', trip: newTrip });
    } catch (err) {
        res.status(500).json({ error: 'Error adding trip', details: err.message });
    }
});

router.put('/updateTrip/:id', async (req, res) => {
    const { userId, trailID, dateOfTrip, userRating, userComments } = req.body;

    try {
        const updatedTrip = await Trip.findByIdAndUpdate(
            req.params.id,
            { userId, trailID, dateOfTrip, userRating, userComments },
            { new: true, runValidators: true }
        );

        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json({ message: 'Trip updated successfully', trip: updatedTrip });
    } catch (err) {
        res.status(500).json({ error: 'Error updating trip', details: err.message });
    }
});

router.delete('/deleteTrip/:id', async (req, res) => {
    try {
        const deletedTrip = await Trip.findByIdAndDelete(req.params.id);

        if (!deletedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json({ message: 'Trip deleted successfully', trip: deletedTrip });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting trip', details: err.message });
    }
});

module.exports = router;
