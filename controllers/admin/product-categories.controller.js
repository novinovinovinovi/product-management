const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-categories.model");
const paginationHelper = require("../../helpers/pagination");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const sortProductHelper = require("../../helpers/sortProduct");

// [GET] /admin/product-categories
module.exports.index = async (req, res) => {
  // Sort List
  const sortList = [
    { value: "position-desc", tag: "Vị trí tăng dần" },
    { value: "position-asc", tag: "Vị trí giảm dần" },
    { value: "title-desc", tag: "Tiêu đề A - Z" },
    { value: "title-asc", tag: "Tiêu đề Z - A" },
  ];
  // End Sort List

  // Filter status
  const filterStatus = filterStatusHelper(req.query);
  // End Filter Status

  let find = { deleted: false };

  if (req.query.status) {
    find.status = req.query.status;
  }
  // Search
  let keyword = "";

  if (req.query.keyword) {
    [find.title, keyword] = Object.values(searchHelper(keyword, req.query));
  }
  // End Search

  // Pagination
  const countCategories = await ProductCategory.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 5,
    },
    req.query,
    countCategories
  );
  // End Pagination

  // Sort
  const sort = sortProductHelper(req.query);
  // End Sort

  const categories = await ProductCategory.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/product-categories/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    categories: categories,
    pagination: objectPagination,
    filterStatus: filterStatus,
    keyword: keyword,
    sortList: sortList,
  });
};

// [GET] /admin/product-categories/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/product-categories/create.pug", {
    pageTitle: "Thêm mới danh mục",
  });
};

// [POST] /admin/product-categories/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  if (req.body.position == "") {
    const countCategories = await ProductCategory.countDocuments();
    req.body.position = countCategories + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const newCategory = new ProductCategory(req.body);
  await newCategory.save();
  res.redirect(`${systemConfig.prefixAdmin}/product-categories`);
};
