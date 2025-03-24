const express = require("express");
const multer = require("multer");
const router = express.Router();
const validate = require("../../validates/admin/product-category.validate");
const checkTokenMiddleware = require("../../midlewares/admin/checkToken.midlewares");
const uploadCloud = require("../../midlewares/admin/uploadCloud.midelwares");
const upload = multer();


const controller = require("../../controllers/admin/product-categories.controller");

router.get("/",checkTokenMiddleware, controller.index);
router.get("/create",checkTokenMiddleware, controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.uploadImage,
  validate.categoryFormPost,
  checkTokenMiddleware,
  controller.createPost
);
module.exports = router;
