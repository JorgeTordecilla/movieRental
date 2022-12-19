const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/Users");
const { generateJWT } = require("../helpers/jwt");

const newUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Email ya existente",
      });
    }
    let isPremium = true;
    let balance = 20000;
    usuario = new Usuario({ ...req.body, isPremium, balance });

    //encrypta pass
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    //JWT
    const token = await generateJWT(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
      isPremium: isPremium,
      balance: balance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno intente mas tarde",
    });
  }
};

const userLogin = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    const isValidPassword = bcrypt.compareSync(password, usuario.password);

    if (!isValidPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña invalida",
      });
    }
    const token = await generateJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
      isPremium: usuario.isPremium,
      balance: usuario.balance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno intente mas tarde",
    });
  }
};

const revalidateToken = async (req, res) => {
  const { uid, name } = req;
  const token = await generateJWT(uid, name);
  let usuario = await Usuario.findOne({ _id: uid });
  res.json({
    ok: true,
    token,
    uid,
    name,
    isPremium: usuario.isPremium,
    balance: usuario.balance,
  });
};

module.exports = {
  newUser,
  userLogin,
  revalidateToken,
};
