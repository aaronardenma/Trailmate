// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Get user by ID
router.get('/getUserById/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user', details: err.message });
    }
});

// Update user
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
        const updateData = {
            firstName,
            lastName,
            email,
            badge,
            gender,
            language,
            nickname,
            country
        };

        const updatedUser = await userService.updateUser(req.params.id, updateData);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: 'Error updating user', details: err.message });
    }
});

// Registration Step 1: Email and Password
router.post("/register/step1", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Email and password are required' 
        });
    }

    const result = await userService.registerStep1(email, password);

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
});

// Registration Step 2: Complete Profile
router.post('/register/step2', async (req, res) => {
    const { userId, firstName, lastName, badge, gender, language, nickname, country } = req.body;
    
    if (!userId) {
        return res.status(400).json({ 
            success: false, 
            message: 'User ID is required' 
        });
    }

    const profileData = { firstName, lastName, badge, gender, language, nickname, country };
    const result = await userService.registerStep2(userId, profileData);
    
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
});

// Check email availability
router.get('/check-email/:email', async (req, res) => {
    const { email } = req.params;
    
    if (!email) {
        return res.status(400).json({ 
            available: false, 
            message: 'Email parameter is required' 
        });
    }

    const result = await userService.checkEmailAvailability(email);
    res.json(result);
});

module.exports = router;