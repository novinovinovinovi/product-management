const systemConfig = require("../../config/system");

const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoriesRoutes = require("./product-categories.route");
const authRoutes = require("./auth.route")

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
  app.use(PATH_ADMIN + "/products", productRoutes);
  app.use(PATH_ADMIN + "/product-categories", productCategoriesRoutes);
  app.use(PATH_ADMIN + "/auth", authRoutes);

};
