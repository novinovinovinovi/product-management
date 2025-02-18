const express = require("express");
const multer = require("multer");
const router = express.Router();
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteProduct);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  validate.productFormPost,
  controller.createPost
);

router.get("/edit/:id", controller.editProduct);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.productFormPost,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);
module.exports = router;
