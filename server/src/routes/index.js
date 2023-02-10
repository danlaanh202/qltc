const thuocTiemRouter = require("./thuoctiem.route");
const benhNhanRouter = require("./benhnhan.route");
const bacSiRouter = require("./bacsi.route");
const PhieuTiemRouter = require("./phieutiem.route");
const ThongKeRouter = require("./thongke.route");
function route(app) {
  app.use("/thuoc_tiem", thuocTiemRouter);
  app.use("/benh_nhan", benhNhanRouter);
  app.use("/bac_si", bacSiRouter);
  app.use("/phieu_tiem", PhieuTiemRouter);
  app.use("/thong_ke", ThongKeRouter);
}
module.exports = route;
