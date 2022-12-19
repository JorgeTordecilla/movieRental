const { response } = require("express");

const Movie = require("../models/Movies");
const Rental = require("../models/Rental");
const FIXED_MOVIE_VALUE = process.env.FIXED_MOVIE_VALUE;

const newMovie = async (req, res = response) => {
  try {
    price = FIXED_MOVIE_VALUE;

    if (Boolean(req.body.isNewMovie)) {
      price = FIXED_MOVIE_VALUE * 2;
    }

    let movie = new Movie({ ...req.body, price });
    await movie.save();
    res.status(201).json({
      ok: true,
      uid: movie.id,
      name: movie.title,
      urlImage: movie.urlImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno intente mas tarde",
    });
  }
};

const getMovies = async (req, res = response) => {
  try {
    const movies = await Movie.find({ stock: { $gt: 0 } });
    res.status(201).json({
      ok: true,
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno intente mas tarde",
    });
  }
};
const getRentMovies = async (req, res = response) => {
  try {
    const movies = await Rental.find({ userUid: { $eq: req.uid } });
    res.status(201).json({
      ok: true,
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno intente mas tarde",
    });
  }
};

const rentMovie = async (req, res = response) => {
  try {
    console.log(req.body);
    const movie = await Movie.findOne({ _id: req.body.movieUid });
    let stock = movie.stock - 1;

    const movieUpdate = await Movie.updateOne(
      { _id: req.body.movieUid },
      { $set: { stock } }
    );
    movie.stock = stock;

    let rental = new Rental({
      movieUid: req.body.movieUid,
      userUid: req.body.userUid,
      date: new Date(),
      movieTitle: movie.title,
      isNewMovie: movie.isNewMovie,
      genre: movie.genre,
    });
    await rental.save();

    res.status(201).json({
      ok: true,
      movie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno intente mas tarde",
    });
  }
};

const returnMovies = async (req, res = response) => {
  try {
    console.log(req.body);
    await Rental.findOneAndDelete({ _id: req.body.uid });

    const movie = await Movie.findById(req.body.movieUid);
    let stock = movie.stock + 1;

    const movieUpdate = await Movie.updateOne(
      { _id: req.body.movieUid },
      { $set: { stock } }
    );

    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno intente mas tarde",
    });
  }
};

module.exports = {
  newMovie,
  getMovies,
  rentMovie,
  getRentMovies,
  returnMovies,
};
