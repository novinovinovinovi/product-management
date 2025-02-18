module.exports = (objectPagination, query, countProducts) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }
  const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
  objectPagination.totalPage = totalPage;
  if (objectPagination.currentPage > totalPage) {
    objectPagination.currentPage = 1;
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;

  return objectPagination;
};
