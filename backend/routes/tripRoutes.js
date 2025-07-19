const express = require('express');
const router = express.Router();
const Trip = require('../models/trips');
const mongoose = require('mongoose');
const authenticateToken = require('../service/auth')

router.get('/', authenticateToken, async (req, res) => {
    const userID = req.user.id
    try {
        const trips = await Trip.find({ userId: userID })
            .populate('trailID')
            .sort({ startDate: -1 });
        console.log(trips)
        res.status(200).json({ success: true, trips });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:tripId', authenticateToken, async (req, res) => {
    const userId = req.user.id
    const {tripId} = req.params
    console.log("ehwhwr")
    try {
        const trip = await Trip.findOne({_id: tripId, userId: userId})
        console.log(trip)
        if (!trip) {
            return res.status(403).json({ success: false, message: "Unauthorized access to trip" });
        }
        res.status(200).json({success: true, trip})
    } catch (err) {
        res.status(500).json({success: false, error: err.message})
    }
})

router.post('/save', authenticateToken, async (req, res) => {
    const { trailID, startDate, endDate, time } = req.body;
    const userId = req.user.id;

    if (!trailID || !startDate || !endDate || !time) {
        return res.status(400).json({
            success: false,
            message: 'Trail ID, start date, end date, and time are required'
        });
    }

    const newTrip = new Trip({
        userId,
        trailID,
        startDate,
        endDate,
        time,
        status: 'Upcoming'
    });

    try {
        await newTrip.save();
        res.status(201).json({
            success: true,
            message: 'Trip saved successfully!',
            tripId: newTrip._id,
            trip: newTrip
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error saving trip',
            error: err.message
        });
    }
});

router.post('/start', authenticateToken, async (req, res) => {
    const { trailID, startDate, endDate, time } = req.body;
    const userId = req.user.id;
    console.log(typeof startDate)
    console.log(startDate)
    if (!trailID || !startDate || !endDate || !time) {
        return res.status(400).json({
            success: false,
            message: 'Trail ID, start date, end date, and time are required'
        });
    }

    const newTrip = new Trip({
        userId,
        trailID,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        time,
        status: 'In Progress'
    });

    try {
        await newTrip.save();
        res.status(201).json({
            success: true,
            message: 'Trip started successfully!',
            tripId: newTrip._id,
            trip: newTrip
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error starting trip',
            error: err.message
        });
    }
});

router.put('/updateStatus/:tripId', authenticateToken, async (req, res) => {
    const { tripId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    if (!['Upcoming', 'In Progress', 'Completed'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status. Must be Upcoming, In Progress, or Completed'
        });
    }

    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { _id: tripId, userId },
            { status },
            { new: true, runValidators: true }
        ).populate('trailID');

        if (!updatedTrip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found or not authorized'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Trip status updated successfully',
            trip: updatedTrip
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating trip status',
            error: err.message
        });
    }
});

router.put('/end/:tripId', authenticateToken, async (req, res) => {
    const { tripId } = req.params;
    const { userRating, userComments } = req.body;
    const userId = req.user.id;

    if (userRating && (userRating < 1 || userRating > 5)) {
        return res.status(400).json({
            success: false,
            message: 'Rating must be between 1 and 5'
        });
    }

    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { _id: tripId, userId },
            {
                status: 'Completed',
                ...(userRating && { userRating }),
                ...(userComments && { userComments })
            },
            { new: true, runValidators: true }
        ).populate('trailID');

        if (!updatedTrip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found or not authorized'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Trip completed successfully',
            trip: updatedTrip
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error completing trip',
            error: err.message
        });
    }
});

router.put('/update/:tripId', authenticateToken, async (req, res) => {
    const { tripId } = req.params;
    const { startDate, endDate, time, userRating, userComments } = req.body;
    const userId = req.user.id;

    try {
        const updateData = {};
        if (startDate) updateData.startDate = startDate;
        if (endDate) updateData.endDate = endDate;
        if (time) updateData.time = time;
        if (userRating) updateData.userRating = userRating;
        if (userComments !== undefined) updateData.userComments = userComments;

        const updatedTrip = await Trip.findOneAndUpdate(
            { _id: tripId, userId },
            updateData,
            { new: true, runValidators: true }
        ).populate('trailID');

        if (!updatedTrip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found or not authorized'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Trip updated successfully',
            trip: updatedTrip
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating trip',
            error: err.message
        });
    }
});

router.delete('/delete/:tripId', authenticateToken, async (req, res) => {
    const { tripId } = req.params;
    const userId = req.user.id;

    try {
        const deletedTrip = await Trip.findOneAndDelete({ _id: tripId, userId });

        if (!deletedTrip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found or not authorized'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Trip deleted successfully',
            trip: deletedTrip
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting trip',
            error: err.message
        });
    }
});

// router.get('/tripsByStatus/:status', authenticateToken, async (req, res) => {
//     const { status } = req.params;
//     const userId = req.user.id;

//     if (!['Upcoming', 'In Progress', 'Completed'].includes(status)) {
//         return res.status(400).json({
//             success: false,
//             message: 'Invalid status'
//         });
//     }

//     try {
//         const trips = await Trip.find({ userId, status })
//             .populate('trailID')
//             .sort({ startDate: -1 });

//         res.status(200).json({ success: true, trips });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

// router.get('/tripsByDateRange', authenticateToken, async (req, res) => {
//     const { startDate, endDate } = req.query;
//     const userId = req.user.id;

//     if (!startDate || !endDate) {
//         return res.status(400).json({
//             success: false,
//             message: "Start date and end date are required"
//         });
//     }

//     try {
//         const start = new Date(startDate);
//         const end = new Date(endDate);

//         const trips = await Trip.find({
//             userId,
//             startDate: { $gte: start, $lte: end }
//         }).populate('trailID').sort({ startDate: 1 });

//         res.status(200).json({ success: true, trips });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

module.exports = router;
