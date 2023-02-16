const express = require("express");
const router = express.Router();
const {
  DaftarUser,
  LoginUser,
  GetSinggleUser,
} = require("../controllers/user.controller");
const {
  runValidation,
  validationDaftar,
  validationLogin,
} = require("../validator/index.validator");

const middleware = require("../middleware/user.middleware");
/**
 * LOGIN API
 */
router.post("/daftar", validationDaftar, runValidation, DaftarUser);
router.post("/login", validationLogin, runValidation, LoginUser);
router.get("/user", middleware, GetSinggleUser);
module.exports = router;
