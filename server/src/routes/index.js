const thuocTiemRouter = require("./thuoctiem.route");
const benhNhanRouter = require("./benhnhan.route");
const bacSiRouter = require("./bacsi.route");
function route(app) {
  app.use("/thuoc_tiem", thuocTiemRouter);
  app.use("/benh_nhan", benhNhanRouter);
  app.use("/bac_si", bacSiRouter);
}
module.exports = route;
