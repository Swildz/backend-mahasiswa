const express = require("express");
const {
  InputMahasiswa,
  EditDataMahasiswa,
} = require("../controllers/mahasiswa.controller");
const router = express.Router();
const {
  runValidation,
  validatorEditData,
  validatorInputData
} = require("../validator/index.validator");

/**
 * INPUT API
 */
router.post("/inputdata", validatorInputData, runValidation, InputMahasiswa);
router.put("/editdata/:id", validatorEditData,runValidation,EditDataMahasiswa);

module.exports = router;
