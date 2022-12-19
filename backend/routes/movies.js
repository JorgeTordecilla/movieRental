const route = require("express").Router();

const { check } = require("express-validator");
const {
  newMovie,
  getMovies,
  rentMovie,
  getRentMovies,
  returnMovies,
} = require("../controllers/movie");
const { fieldsValidator } = require("../middleware/fields_validator");
const { jwtValidator } = require("../middleware/jwt_validator");

route.post(
  "/new",
  [
    check("title", "title is required").not().isEmpty().isString(),
    check("genre", "genre is required").not().isEmpty().isString(),
    check("autor", "autor is required").not().isEmpty().isString(),
    check("urlImage", "urlImage is required").not().isEmpty().isString(),
    check("isNewMovie", "isNewMovie is required").not().isEmpty().isBoolean(),
    check("stock", "stock is required").not().isEmpty().isNumeric(),
    fieldsValidator,
  ],
  newMovie
);
route.get("/movies", [jwtValidator], getMovies);
route.get("/rentmovies", [jwtValidator], getRentMovies);
route.post("/returnmovies", [jwtValidator], returnMovies);

route.post("/rent", [jwtValidator], rentMovie);

module.exports = route;
