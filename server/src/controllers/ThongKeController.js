const db = require("../models");
const addDays = require("date-fns/addDays");
const format = require("date-fns/format");
const mailer = require("../utils/mailer");

class ThongKeController {
  async thongKeSoMuiDaTiem(req, res) {
    try {
      const getBenhNhan = await db.BenhNhan.findAll({
        limit: 10,
        raw: true,
      });

      const getDocs = await db.PhieuTiem.findAll({
        where: {
          id_benh_nhan: getBenhNhan.map((item) => item.id_benh_nhan),
        },
        include: ["BacSi", "BenhNhan", "ThuocTiem"],
        raw: true,
      });
      const resultDocs = getDocs.map((item) => {
        return {
          _id: item.id_phieu_tiem,
          id_benh_nhan: item.id_benh_nhan,
          so_mui_tiem: item.so_mui_da_tiem + 1,
          ho_ten: item["BenhNhan.ho_ten"],
          ten_thuoc: item["ThuocTiem.ten_thuoc"],
          so_mui_con_thieu:
            item["ThuocTiem.so_mui_can_tiem"] - item.so_mui_da_tiem - 1,
          ngay_tiem_mui_ke_tiep: format(
            addDays(new Date(item.ngay_tiem), item.so_ngay_tiem_mui_ke_tiep),
            "yyyy-MM-dd"
          ),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      return res.status(200).json(resultDocs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async sendEmail(req, res) {
    try {
      await mailer.sendMail(
        req.query.email,
        "Send Email",
        "Gửi email đến bạn yêu"
      );
      return res.status(200).json("Đã gửi");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new ThongKeController();
