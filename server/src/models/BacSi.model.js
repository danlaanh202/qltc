module.exports = (sequelize, DataTypes) => {
  const BacSi = sequelize.define("BacSi", {
    ma_dinh_danh: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ten_bac_si: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    tuoi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chuc_danh: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    so_dien_thoai: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });

  return BacSi;
};
