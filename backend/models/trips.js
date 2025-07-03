const mongoose = require("mongoose");
// const {UUID} = require("mongodb");
const Schema = mongoose.Schema;

const tripsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trailID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trail",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Upcoming", "In Progress", "Completed"],
    default: "Upcoming",
  },
  userRating: {
    type: Number,
    min: 1,
    max: 5,
  },
  userComments: String,
});

const Trip = mongoose.model("Trip", tripsSchema);
module.exports = Trip;
