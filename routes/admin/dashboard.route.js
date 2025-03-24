const express = require("express");

const router = express.Router();

const controller = require("../../controllers/admin/dashboard.controller");
const checkTokenMiddleware = require("../../midlewares/admin/checkToken.midlewares");

router.get("/", checkTokenMiddleware, controller.dashboard);

module.exports = router;
