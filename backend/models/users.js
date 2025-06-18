const mongoose = require('mongoose');
const {UUID} = require("mongodb");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    badge: String,
    gender: String,
    language: String,
    nickname: String,
    country: String,
});

const User = mongoose.model('User', usersSchema);
module.exports = User;
