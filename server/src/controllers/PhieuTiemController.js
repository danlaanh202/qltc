const { BacSi } = require("../models");
const db = require("../models");

class PhieuTiemController {
  async taoPhieu(req, res) {
    try {
      const doc = await db.PhieuTiem.create(req.body);
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getPhieu(req, res) {
    try {
      const getDocs = await db.PhieuTiem.findAll({
        include: ["BacSi", "BenhNhan", "ThuocTiem"],
      });

      return res.status(200).json(getDocs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new PhieuTiemController();
