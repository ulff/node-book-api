module.exports = function({current, maxPages}) {
  const pageLimit = maxPages <= 10 ? maxPages : 10;
  const pages = [];
  const begin = current > pageLimit/2 ? current-(pageLimit/2) : 0;
  const end = begin+pageLimit < maxPages ? begin+pageLimit : maxPages;

  if (current > pageLimit) {
    return pages;
  }

  for (let i = begin; i < end; i++) {
    pages.push({start: i, isCurrent: i === current ? true : false});
  }

  return pages;
};
