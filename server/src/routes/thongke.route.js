const router = require("express").Router();
const ThongKeController = require("../controllers/ThongKeController");

router.get("/1", ThongKeController.thongKeSoMuiDaTiem);
router.get("/send_email", ThongKeController.sendEmail);
module.exports = router;
