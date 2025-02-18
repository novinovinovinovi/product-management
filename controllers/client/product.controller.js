const Product = require("../../models/product.model");

// [GET] /products
module.exports.index = async (req, res) => {
  let find = {
    status: "active",
    deleted: "false",
  };

  // Pagination
  const countProduct = await Product.countDocuments(find);

  // End Pagination

  const products = await Product.find(find).sort({ position: "desc" });

  const newProducts = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts,
  });
};

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;
    let find = {
      slug: slug,
      deleted: false,
      status: "active",
    };

    const product = await Product.findOne(find);

    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect("back");
  }
};
