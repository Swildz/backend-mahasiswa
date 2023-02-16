const { Mahasiswa } = require("../models");

exports.InputMahasiswa = async (req, res) => {
  const { name, nohp, alamat, jurusan, prestasi, description } = req.body;

    const nameMahasiswa = await Mahasiswa.findOne({
      name: name,
    });

    const nohpMahasiswa = await Mahasiswa.findOne({
      nohp: nohp,
    });

    if (nameMahasiswa) {
      return res.status(404).json({
        status: false,
        message: "nama sudah terdaftar",
      });
    }
    if (nohpMahasiswa) {
      return res.status(404).json({
        status: false,
        message: "nohp sudah terdaftar",
      });
    }
  const mahasiswa = new Mahasiswa({
    name: name,
    nohp: nohp,
    alamat: alamat,
    jurusan: jurusan,
    prestasi: prestasi,
    description: description,
  });
  mahasiswa.save();
  return res.status(201).json({
    status: true,
    message: "Berhasil daftar",
  });
};

exports.EditDataMahasiswa = async (req, res) => {
  const id = req.params.id;

  let mahasiswa = await Mahasiswa.findByPk(id);

  if (!mahasiswa) {
    return res.json({
      status: false,
      message: "Mahasiswa Not Found",
    });
  }

  mahasiswa = await mahasiswa.update(req.body);
  return res.status(201).json({
    status: true,
    message: "Berhasi Edit Data",
    data : mahasiswa
  });
};
