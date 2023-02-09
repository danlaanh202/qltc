const router = require("express").Router();
const PhieuTiemController = require("../controllers/PhieuTiemController");

router.post("/create", PhieuTiemController.taoPhieu);
router.get("/get", PhieuTiemController.getPhieu);

module.exports = router;
