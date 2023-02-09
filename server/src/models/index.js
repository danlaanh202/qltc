const dbConfig = require("../config/db.config");
const ThuocTiem = require("./ThuocTiem.model");
const BenhNhan = require("./BenhNhan.model");
const PhieuTiem = require("./PhieuTiem.model");
const BacSi = require("./BacSi.model");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.BenhNhan = BenhNhan(sequelize, Sequelize.DataTypes);
db.ThuocTiem = ThuocTiem(sequelize, Sequelize.DataTypes);
db.BacSi = BacSi(sequelize, Sequelize.DataTypes);
db.PhieuTiem = PhieuTiem(sequelize, Sequelize.DataTypes);

db.PhieuTiem.belongsTo(db.ThuocTiem, {
  foreignKey: "ma_so_thuoc",
});
db.PhieuTiem.belongsTo(db.BenhNhan, {
  foreignKey: "id_benh_nhan",
});
db.PhieuTiem.belongsTo(db.BacSi, {
  foreignKey: "ma_dinh_danh",
});

module.exports = db;
