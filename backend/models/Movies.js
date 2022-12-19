const { Schema, model } = require("mongoose");

const MoviesSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  isNewMovie: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  urlImage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = model("Movies", MoviesSchema);
