const Account = require("../../models/account.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");

//[GET] /admin/auth/login
module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Trang đăng nhập",
  });
};

//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  const account = await Account.findOne({ email: email, deleted: false });

  if (!account) {
    req.flash("error", "Email chưa được đăng kí!");
    res.redirect("back");
    return;
  }

  if (md5(password) != account.password) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }

  if (account.status == "inactive") {
    req.flash("error", "Tài khoản đã bị khóa!");
    res.redirect("back");
    return;
  }

  res.cookie("token", account.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

//[GET] /admin/auth/signin
module.exports.signin = (req, res) => {
  res.render("admin/pages/auth/signin", {
    pageTitle: "Trang đăng kí",
  });
};

//[POST] /admin/auth/signin
module.exports.signinPost = async (req, res) => {
  const existedAccount = await Account.findOne({
    email: req.body.email,
  });
  if (existedAccount) {
    req.flash("error", "Email đã tồn tại!");
    res.redirect("back");
    return;
  }

  const account = {
    email: req.body.email,
    password: md5(req.body.password),
  };
  const newAccount = new Account(account);
  await newAccount.save();
  req.flash("success", "Đăng kí tài khoản thành công!");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};

//[GET] /admin/auth/logout
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
