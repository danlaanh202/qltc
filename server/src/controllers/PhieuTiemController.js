const { BacSi } = require("../models");
const db = require("../models");

class PhieuTiemController {
  async taoPhieu(req, res) {
    console.log(req.body);
    try {
      const p1 = db.PhieuTiem.create(req.body);
      const p2 = db.ThuocTiem.increment(
        {
          so_luong: -1,
        },
        {
          where: {
            ma_so_thuoc: req.body.ma_so_thuoc,
          },
        }
      );
      const [doc, incre] = await Promise.all([p1, p2]);

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
