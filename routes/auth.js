const Router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
Router.post("/register", async (req, res) => {
  const { username, country, phone, email } = req.body;

  const findUserByEmail = await User.findOne({ email: email });
  if (findUserByEmail) {
    res.status(401).json("Ooops! User already Exist");
    return;
  }

  const findUserByUserName = await User.findOne({ username: username });
  if (findUserByUserName) {
    res.status(401).json("Ooops! Username already Exist");
    return;
  }
  const findUserByPhone = await User.findOne({ phone: phone });
  if (findUserByPhone) {
    res.status(401).json("Ooops! Phone already Exist");
    return;
  }

  const newUser = new User({
    username,
    country,
    phone,
    email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
Router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json("Wrong Credentials");
      return;
    }

    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );

    const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    if (OriginalPassword !== req.body.password) {
      res.status(401).json("Oops! Password is Incorrect Wrong Crendentials");
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "90d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
    console.log(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
