const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  const existedToken = await Account.findOne({
    token: token,
  }).select("-password");

  if (!existedToken) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }
  next();
};
