const db = require("../models");
const addDays = require("date-fns/addDays");
const format = require("date-fns/format");
const mailer = require("../utils/mailer");
const { compareAsc } = require("date-fns");

class ThongKeController {
  async thongKeSoMuiDaTiem(req, res) {
    try {
      const getBenhNhan = await db.BenhNhan.findAll({
        raw: true,
      });

      const getDocs = await db.PhieuTiem.findAll({
        where: {
          id_benh_nhan: getBenhNhan.map((item) => item.id_benh_nhan),
        },
        include: ["BacSi", "BenhNhan", "ThuocTiem"],
        raw: true,
      });
      const resultDocs = getDocs
        .map((item) => {
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
            email_benh_nhan: item["BenhNhan.email"],
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        })
        .reduce((prev, curr) => {
          let exist = prev.find(
            ({ id_benh_nhan, ten_thuoc }) =>
              curr.id_benh_nhan === id_benh_nhan && curr.ten_thuoc === ten_thuoc
          );
          if (!exist) prev.push(curr);
          return prev;
        }, []);

      return res.status(200).json(resultDocs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async thongKeSortByNextDate(req, res) {
    try {
      const getBenhNhan = await db.BenhNhan.findAll({
        raw: true,
      });

      const getDocs = await db.PhieuTiem.findAll({
        where: {
          id_benh_nhan: getBenhNhan.map((item) => item.id_benh_nhan),
        },
        include: ["BacSi", "BenhNhan", "ThuocTiem"],
        raw: true,
      });
      const resultDocs = getDocs
        .map((item) => {
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
            email_benh_nhan: item["BenhNhan.email"],
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        })
        .reduce((prev, curr) => {
          let exist = prev.find(
            ({ id_benh_nhan, ten_thuoc }) =>
              curr.id_benh_nhan === id_benh_nhan && curr.ten_thuoc === ten_thuoc
          );
          if (!exist) prev.push(curr);
          return prev;
        }, [])
        .sort((a, b) =>
          compareAsc(
            new Date(a.ngay_tiem_mui_ke_tiep),
            new Date(b.ngay_tiem_mui_ke_tiep)
          )
        );

      return res.status(200).json(resultDocs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async sendEmail(req, res) {
    try {
      await mailer.sendMail(
        req.query.email,
        "Nhắc nhở tiêm chủng",
        `<div>
          <div>Điểm tiêm chủng xin thông báo :</div>
          <div>Bệnh nhân : ${req.query.ho_ten}</div>
          <div>ID: ${req.query.id_benh_nhan}</div>
          <div>Có lịch tiêm mũi tiếp theo vào ngày ${req.query.ngay_tiem_mui_ke_tiep}.</div>
          <div>Tên thuốc tiêm : ${req.query.ten_thuoc}</div>
          <div>Mong bệnh nhân sẽ có mặt và tiêm chủng đầy đủ.</div>
          <div>Xin cảm ơn</div>
        </div>
        `
      );
      return res.status(200).json("Đã gửi");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new ThongKeController();
