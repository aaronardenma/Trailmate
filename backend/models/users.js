const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {UUID} = require("mongodb");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
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
    badge: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    },
    gender: String,
    nickname: String,
    country: String,
    photoUrl: String,
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
    gear: {
        type: [{
          category: String,
          item: String
        }],
        default: []
    },
    profileCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

usersSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const saltRounds = 12;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error) {
        next(error);
    }
});

usersSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

usersSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

module.exports = mongoose.model('Users', usersSchema);