const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/auth.controller");
const validate = require("../../validates/admin/auth.validate");

router.get("/login", controller.login);

router.post("/login", validate.login, controller.loginPost);

router.get("/signin", controller.signin);

router.post("/signin", validate.signin, controller.signinPost);

router.get("/logout", controller.logout);

module.exports = router;
