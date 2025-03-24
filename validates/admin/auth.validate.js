module.exports.login = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    res.redirect("back");
    return;
  }

  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    res.redirect("back");
    return;
  }

  next();
};

module.exports.signin = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    res.redirect("back");
    return;
  }

  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    res.redirect("back");
    return;
  }

  if (!req.body.passwordConfirm) {
    req.flash("error", "Vui lòng nhập xác nhận mật khẩu!");
    res.redirect("back");
    return;
  }

  if (req.body.password != req.body.passwordConfirm){
    req.flash("error", "Mật khẩu xác thận không chính xác!");
    res.redirect("back");
    return;
  }
  next();
};