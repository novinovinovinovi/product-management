module.exports = (keyword, query) => {
  keyword = query.keyword;

  const regex = new RegExp(keyword, "i");
  return { regex: regex, keyword: keyword };
};
