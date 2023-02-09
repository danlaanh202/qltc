const router = require("express").Router();
const BacSiController = require("../controllers/BacSiController");

router.post("/create", BacSiController.createBacSi);
router.get("/get_all", BacSiController.getAll);
router.get("/search", BacSiController.timKiemBacSi);
router.delete("/delete", BacSiController.deleteBacSi);
router.put("/edit", BacSiController.editBacSi);
module.exports = router;
