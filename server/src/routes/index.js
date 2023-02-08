const thuocTiemRouter = require("./thuoctiem.route");
function route(app) {
  app.use("/thuoc_tiem", thuocTiemRouter);
}
module.exports = route;
