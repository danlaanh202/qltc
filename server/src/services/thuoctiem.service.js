const db = require("../models");
const Op = db.Sequelize.Op;

class ThuocTiemServices {
  async getDocByName(searchQuery) {
    return await db.ThuocTiem.findAll({
      where: {
        ten_thuoc: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
    });
  }
  async editDocById(body) {
    const updateRecord = {
      ten_thuoc: body.ten_thuoc,
      don_gia: parseInt(body.don_gia),
      so_luong: parseFloat(body.so_luong),
      so_mui_can_tiem: parseInt(body.so_mui_can_tiem),
      so_ngay_tiem_mui_ke_tiep: parseInt(body.so_ngay_tiem_mui_ke_tiep),
    };
    return await db.ThuocTiem.update(updateRecord, {
      offset: 0,
      limit: 20,
      where: {
        ma_so_thuoc: body.ma_so_thuoc,
      },
    });
  }
}
module.exports = new ThuocTiemServices();
