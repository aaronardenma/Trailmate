const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const authenticateToken = require('../service/auth');
const User = require('../models/users');
const { error } = require('console');

router.get('/getUserById/:id', authenticateToken, async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isOwner = req.user.id === req.params.id;

        if (isOwner) {
            // Full access if the logged-in user is requesting their own profile
            return res.status(200).json(targetUser.toJSON());
        } else {
            // Only return selected public fields
            const {
                firstName,
                lastName,
                badge,
                nickname,
                country,
                photoUrl
            } = targetUser;

            return res.status(200).json({
                firstName,
                lastName,
                badge,
                nickname,
                country,
                photoUrl
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
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

router.post("/register/auth", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    try {
        const existingUser = await User.findOne({email: email.toLowerCase()})

        if (existingUser) {
            throw new Error('Email already registered');
        }
        console.log('no existing user')
        
        const newUser = new User({email: email.toLowerCase(), password: password})
        console.log('new user created')
        
        const savedUser = await newUser.save()
        console.log('new user saved')
        
        const token = jwt.sign(
            {id: savedUser._id, email: email},
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )
        console.log('token generated')
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'lax',
            maxAge: 3600000
        })
        console.log('Setting cookie with token:', token.substring(0, 20) + '...');
        console.log('Cookie options:', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'lax',
            maxAge: 3600000
        });
        console.log('cookie sent')

        return res.status(200).json({success: true, user: savedUser.email})

    } catch (err) {
        res.status(500).json({success: false, error: err.message})
    }
});

router.post('/register/setup', authenticateToken, async (req, res) => {
    const { firstName, lastName, badge, gender, nickname, country, gear, visibility } = req.body;
    const userId = req.user.id;
    
    try {
        const user = await User.findOneAndUpdate({_id: userId}, {$set: {firstName: firstName,
                                                lastName: lastName,
                                                badge: badge,
                                                gender: gender,
                                                nickname: nickname,
                                                country: country,
                                                gear: gear,
                                                visibility: visibility}}, {new: true, runValidators: true})

        if (!user) {
            throw new Error('User not found');
        }

        res.status(200).json({success: true, user})
    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, message: err.message})
    }
});

router.post('/login/auth', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'lax',
            maxAge: 3600000     // 1 hour
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: user.toJSON()
        });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
});

router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.toJSON());
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;