const User = require('../models/users');

async function registerStep1(email, password) {
    try {
        if (!validatePassword(password)) {
            throw new Error('Password does not meet criteria');
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        const newUser = new User({
            email: email.toLowerCase(),
            password: password,
        });

        const savedUser = await newUser.save();
        
        return {
            success: true,
            userId: savedUser._id,
            message: 'Step 1 complete. Please complete your profile.'
        };

    } catch (error) {
        if (error.code === 11000) {
            return {
                success: false,
                message: 'Email already registered'
            };
        }
        
        return {
            success: false,
            message: error.message
        };
    }
}

async function registerStep2(userId, profileData) {
    try {
        const { firstName, lastName, badge, gender, language, nickname, country } = profileData;
        
        if (!firstName || !lastName || !country) {
            throw new Error('First name, last name, and country are required');
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                badge: badge || null,
                gender: gender || null,
                language: language || null,
                nickname: nickname || null,
                country
            },
            { 
                new: true,
                runValidators: true 
            }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return {
            success: true,
            user: updatedUser,
            message: 'Registration completed successfully'
        };

    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < minLength) {
        throw new Error('Password must be at least 8 characters long');
    }
    if (!hasUpperCase) {
        throw new Error('Password must contain at least one uppercase letter');
    }
    if (!hasLowerCase) {
        throw new Error('Password must contain at least one lowercase letter');
    }
    if (!hasNumbers) {
        throw new Error('Password must contain at least one number');
    }
    if (!hasSpecialChar) {
        throw new Error('Password must contain at least one special character');
    }
    
    return true;
}

async function checkEmailAvailability(email) {
    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        return {
            available: !existingUser,
            message: existingUser ? 'Email already registered' : 'Email available'
        };
    } catch (error) {
        return {
            available: false,
            message: 'Error checking email availability'
        };
    }
}

async function getUserById(id) {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
}

async function updateUser(id, updateData) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerStep1,
    registerStep2,
    validatePassword,
    checkEmailAvailability,
    getUserById,
    updateUser,
    deleteUser
};