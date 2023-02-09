const db = require("../models");
const Op = db.Sequelize.Op;
const ThuoctiemServices = require("../services/thuoctiem.service");

class ThuocTiemController {
  async create(req, res) {
    try {
      const createdDoc = await db.ThuocTiem.create(req.body);
      return res.status(200).json(createdDoc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getAll(req, res) {
    try {
      const getDocs = await db.ThuocTiem.findAll();
      return res.status(200).json(getDocs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getOneByName(req, res) {
    try {
      const doc = await ThuoctiemServices.getDocByName(req.query.ten_thuoc);
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async editOne(req, res) {
    try {
      const updatedDoc = await ThuoctiemServices.editDocById(req.body);
      return res.status(200).json(updatedDoc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async deleteOne(req, res) {
    try {
      const deleteDoc = await db.ThuocTiem.destroy({
        where: {
          ma_so_thuoc: req.query.ma_so_thuoc,
        },
      });
      return res.status(200).json(deleteDoc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  // async search(req, res) {
  //   try {
  //     const searchDocs = await db.ThuocTiem.findAll({
  //       where: {
  //         ten_thuoc: {
  //           [Op.like]: `%${req.query.ten_thuoc}%`,
  //         },
  //       },
  //     });
  //     return res.status(200).json(searchDocs);
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
  // }
}

module.exports = new ThuocTiemController();
