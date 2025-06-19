const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/getUserById/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user', details: err.message });
    }
});
router.put('/updateUser/:id', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        badge,
        gender,
        language,
        nickname,
        country
    } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstName,
                lastName,
                email,
                badge,
                gender,
                language,
                nickname,
                country
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: 'Error updating user', details: err.message });
    }
});

router.post('/addUser', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        badge,
        gender,
        language,
        nickname,
        country
    } = req.body;

    const newUser = new User({
        firstName,
        lastName,
        email,
        badge,
        gender,
        language,
        nickname,
        country
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ error: 'Error adding user', details: err.message });
    }
});

module.exports = router;
