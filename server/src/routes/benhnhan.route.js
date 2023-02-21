const router = require("express").Router();
const BenhNhanController = require("../controllers/BenhNhanController");

router.post("/create", BenhNhanController.createBenhNhan);
router.get("/get_with_pagination", BenhNhanController.getWithPagination);
router.get("/get_all", BenhNhanController.getAll);
router.put("/edit", BenhNhanController.editBenhNhan);
router.get("/search", BenhNhanController.timKiemBenhNhan);

module.exports = router;
