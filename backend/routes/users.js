const route = require("express").Router();

const { userRentMovie, userRemove } = require("../controllers/user");
const { jwtValidator } = require("../middleware/jwt_validator");

route.post("/rent", [jwtValidator], userRentMovie);
route.post("/remove", [jwtValidator], userRemove);

module.exports = route;
