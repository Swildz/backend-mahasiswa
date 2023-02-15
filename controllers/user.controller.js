require("dotenv").config();
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
exports.DaftarUser = async (req, res) => {
  const { username, email, password } = req.body;

  const emailUser = await User.findOne({
    email: email,
  });

  const usernameUser = await User.findOne({
    username: username,
  });

  if (usernameUser) {
    return res.status(404).json({
      status: false,
      message: "username sudah terdaftar",
    });
  }

  if (emailUser) {
    return res.status(404).json({
      status: false,
      message: "Email sudah terdaftar",
    });
  }

  const hashPassword = await bcryptjs.hash(password, 12);
  const user = new User({
    username: username,
    email: email,
    password: hashPassword,
  });

  user.save();
  return res.status(201).json({
    status: true,
    message: "Berhasil daftar",
  });
};

exports.LoginUser = async (req, res) => {
  const { username, password } = req.body;

  const dataUser = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });
  if (dataUser) {
    //jika username ada
    const passwordUser = await bcryptjs.compare(password, dataUser.password);
    if (passwordUser) {
      //jika password ada
      const data = {
        id: dataUser._id,
      };
      const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET);
      return res.status(200).json({
        message: "Login Succes",
        token: token,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "password salah",
      });
    }
  } else {
    return res.status(404).json({
      status: false,
      message: "username atau email tidak tersedia",
    });
  }
};

exports.GetSinggleUser = async (req,res) => {
    const user = await User.findOne({_id : req.id})
    return res.status(200).json({
        message : "Data Berhasil di Panggil",
        data: user
    })
}
