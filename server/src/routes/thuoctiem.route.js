const router = require("express").Router();
const ThuocTiemController = require("../controllers/ThuocTiemController");

router.post("/tao_thuoc_tiem", ThuocTiemController.create);
router.get("/lay_thuoc_tiem", ThuocTiemController.getAll);
router.get("/tim_kiem", ThuocTiemController.getOneByName);
router.put("/sua_thuoc", ThuocTiemController.editOne);
router.delete("/xoa_thuoc", ThuocTiemController.deleteOne);
router.get("/get_with_pagination", ThuocTiemController.getWithPagination);
module.exports = router;
