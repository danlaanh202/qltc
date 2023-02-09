module.exports = (sequelize, DataTypes) => {
  const PhieuTiem = sequelize.define(
    "PhieuTiem",
    {
      id_phieu_tiem: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      id_benh_nhan: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "BenhNhans",
          key: "id_benh_nhan",
        },
      },
      ma_dinh_danh: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "BacSis",
          key: "ma_dinh_danh",
        },
      },
      ma_so_thuoc: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "ThuocTiems",
          key: "ma_so_thuoc",
        },
      },
      so_mui_da_tiem: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ngay_da_tiem: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      ngay_tiem: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      so_ngay_tiem_mui_ke_tiep: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );

  return PhieuTiem;
};
