module.exports = (sequelize, DataTypes) => {
  const BenhNhan = sequelize.define("BenhNhan", {
    id_benh_nhan: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ho_ten: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    can_cuoc: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    ngay_sinh: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    so_dien_thoai: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    gioi_tinh: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  });

  return BenhNhan;
};
