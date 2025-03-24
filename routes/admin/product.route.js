const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../midlewares/admin/uploadCloud.midelwares");

const router = express.Router();
// const storageMulter = require("../../helpers/storageMulter");

const upload = multer();

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const checkTokenMiddleware = require("../../midlewares/admin/checkToken.midlewares");

router.get("/", checkTokenMiddleware, controller.index);

router.patch(
  "/change-status/:status/:id",
  checkTokenMiddleware,
  controller.changeStatus
);

router.patch("/change-multi", checkTokenMiddleware, controller.changeMulti);

router.delete("/delete/:id", checkTokenMiddleware, controller.deleteProduct);

router.get("/create", checkTokenMiddleware, controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.uploadImage,
  validate.productFormPost,
  checkTokenMiddleware,
  controller.createPost
);

router.get("/edit/:id", checkTokenMiddleware, controller.editProduct);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.uploadImage,
  validate.productFormPost,
  checkTokenMiddleware,
  controller.editPatch
);

router.get("/detail/:id", checkTokenMiddleware, controller.detail);
module.exports = router;
