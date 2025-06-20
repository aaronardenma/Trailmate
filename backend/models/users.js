const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {UUID} = require("mongodb");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    id: UUID,
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    badge: String,
    gender: String,
    nickname: String,
    country: {
        type: String
    },
    // preferences: ,
}, {
    timestamps: true
});

// Hash password before saving
usersSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password with cost of 12
        const saltRounds = 12;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to check password
usersSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

// Remove password from JSON output
usersSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

module.exports = mongoose.model('Users', usersSchema);