module.exports = (sequelize, DataTypes) => {
  const ThuocTiem = sequelize.define("ThuocTiem", {
    ma_so_thuoc: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ten_thuoc: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    so_luong: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    so_mui_can_tiem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    so_ngay_tiem_mui_ke_tiep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    don_gia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return ThuocTiem;
};
