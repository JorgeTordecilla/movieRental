const { Schema, model, ObjectId } = require("mongoose");

const RentalSchema = Schema({
  movieUid: {
    type: ObjectId,
    required: true,
  },
  userUid: {
    type: ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  isNewMovie: {
    type: Boolean,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

module.exports = model("Rental", RentalSchema);
