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
        country,
        photoUrl
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
                country,
                photoUrl
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
// // routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// // const userService = require('../services/userService');
//
// router.get('/getUserById/:id', async (req, res) => {
//     try {
//         const user = await User.getUserById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
//
// router.delete('/deleteUser/:id', async (req, res) => {
//     try {
//         const deletedUser = await userService.deleteUser(req.params.id);
//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
//     } catch (err) {
//         res.status(500).json({ error: 'Error deleting user', details: err.message });
//     }
// });
//
// router.put('/updateUser/:id', async (req, res) => {
//     const {
//         firstName,
//         lastName,
//         email,
//         badge,
//         gender,
//         language,
//         nickname,
//         country,
//         photoUrl
//     } = req.body;
//
//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id,
//             {
//                 firstName,
//                 lastName,
//                 email,
//                 badge,
//                 gender,
//                 language,
//                 nickname,
//                 country,
//                 photoUrl
//             },
//             { new: true, runValidators: true }
//         );
//
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//
//         res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//     } catch (err) {
//         res.status(500).json({ error: 'Error updating user', details: err.message });
//     }
// });
//
// router.post("/register/step1", async (req, res) => {
//     const { email, password } = req.body;
//
//     if (!email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: 'Email and password are required'
//         });
//     }
//
//     const result = await userService.registerStep1(email, password);
//
//     if (result.success) {
//         res.status(200).json(result);
//     } else {
//         res.status(400).json(result);
//     }
// });
//
// router.post('/register/step2', async (req, res) => {
//     const { userId, firstName, lastName, badge, gender, language, nickname, country } = req.body;
//
//     if (!userId) {
//         return res.status(400).json({
//             success: false,
//             message: 'User ID is required'
//         });
//     }
//
//     const profileData = { firstName, lastName, badge, gender, language, nickname, country };
//     const result = await userService.registerStep2(userId, profileData);
//
//     if (result.success) {
//         res.status(200).json(result);
//     } else {
//         res.status(400).json(result);
//     }
// });
//
// router.get('/check-email/:email', async (req, res) => {
//     const { email } = req.params;
//
//     if (!email) {
//         return res.status(400).json({
//             available: false,
//             message: 'Email parameter is required'
//         });
//     }
//
//     const result = await userService.checkEmailAvailability(email);
//     res.json(result);
// });
//
// module.exports = router;