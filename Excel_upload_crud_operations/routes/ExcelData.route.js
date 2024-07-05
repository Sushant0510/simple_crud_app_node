const {
  upload,
  uploadExcel,
  updateData,
  deleteData,
  getDataById,
  getData,
} = require("../controllers/excelController.js");

const express = require("express");
const router = express.Router();

router.get("/", getData);
router.get("/:id", getDataById);
router.post("/", upload.single("file"), uploadExcel);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

module.exports = router;
