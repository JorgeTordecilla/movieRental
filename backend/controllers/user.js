const { response } = require("express");
const Users = require("../models/Users");

const PREMIUM_DISCOUNT = process.env.PREMIUM_DISCOUNT;

const userRentMovie = async (req, res = response) => {
  try {
    const { uid, isPremium, moviePrice } = req.body;
    const user = await Users.findOne({ _id: uid });

    let movieFinalPrice = moviePrice;
    if (isPremium) {
      movieFinalPrice *= parseFloat(PREMIUM_DISCOUNT);
    }

    let balance = user.balance - movieFinalPrice;
    const userUpdate = await Users.updateOne(
      { _id: req.body.uid },
      { $set: { balance } }
    );
    user.balance = balance;
    res.status(201).json({
      ok: true,
      balance: user.balance,
      _id: user._id,
      email: user.email,
      isPremium: user.isPremium,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno intente mas tarde",
    });
  }
};

const userRemove = async (req, res = response) => {
  try {
    console.log(req);
    const { uid } = req.body;
    const user = await Users.findOneAndDelete({ _id: uid });

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
  userRentMovie,
  userRemove,
};
