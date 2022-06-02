export function resultSuccess<T = Recordable>(
  result: T,
  { message = "ok" } = {}
) {
  return {
    code: 200,
    result,
    message,
    type: "success",
  };
}

export function pagination(page, pageSize, array) {
  const pageCount = page * pageSize;
  const pagePre = (page - 1) * pageSize;
  const data = array.filter((item, index) => {
    return index < pageCount && index >= pagePre;
  });
  return data;
}

export function paginationSearch(page, pageSize, array, name) {
  const searchArray = array.filter((item) => {
    return item.username.indexOf(name) !== -1;
  });

  return {
    searchTotal: searchArray.length,
    searchRows: pagination(page, pageSize, searchArray),
  };
}
