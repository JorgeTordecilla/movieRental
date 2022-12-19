const route = require("express").Router();

const { check } = require("express-validator");
const { newUser, userLogin, revalidateToken } = require("../controllers/auth");
const { fieldsValidator } = require("../middleware/fields_validator");
const { jwtValidator } = require("../middleware/jwt_validator");

route.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "email is required and email format").isEmail(),
    check("password", "password must be at least 6 characters").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  newUser
);

route.post(
  "/",
  [
    check("email", "email is required and email format").isEmail(),
    check("password", "password must be at least 6 characters").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  userLogin
);

route.get("/renew", [jwtValidator], revalidateToken);

module.exports = route;
