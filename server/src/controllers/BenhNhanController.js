const db = require("../models");
const Op = db.Sequelize.Op;
class BenhNhanController {
  async createBenhNhan(req, res) {
    try {
      const savedDoc = await db.BenhNhan.create(req.body);
      return res.status(200).json(savedDoc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getAll(req, res) {
    try {
      const getDocs = await db.BenhNhan.findAll();
      return res.status(200).json(getDocs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async editBenhNhan(req, res) {
    try {
      const updatedDoc = await db.BenhNhan.update(
        {
          ho_ten: req.body.ho_ten,
          can_cuoc: req.body.can_cuoc,
          ngay_sinh: new Date(req.body.ngay_sinh),
          so_dien_thoai: req.body.so_dien_thoai,
          gioi_tinh: req.body.gioi_tinh,
          email: req.body.email,
          dia_chi: req.body.dia_chi,
        },
        {
          where: {
            id_benh_nhan: req.body.id_benh_nhan,
          },
        }
      );
      return res.status(200).json(updatedDoc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async timKiemBenhNhan(req, res) {
    try {
      const getDoc = await db.BenhNhan.findAll({
        where: {
          ho_ten: {
            [Op.like]: `%${req.query.ten_benh_nhan}%`,
          },
        },
      });
      return res.status(200).json(getDoc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new BenhNhanController();
