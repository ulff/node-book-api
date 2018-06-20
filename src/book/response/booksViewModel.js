const { bookLink, sortLinks, paginationLink } = require("./links");

module.exports = {
  html({ books, pages = [], listCriteria = {}, layout }) {
    return {
      books: withLinks(books),
      pages: pagesModel(pages, listCriteria),
      sortLinks: sortLinks(listCriteria.sort),
      layout
    };
  }
};

function pagesModel(pages, { sort, sortBy }) {
  return pages.map(({ isCurrent, start }) => ({
    isCurrent,
    humanDisplay: start + 1,
    href: paginationLink({ start, sort, sortBy })
  }));
}

function withLinks(books) {
  return books.map(book => ({ ...book, link: bookLink(book.isbn) }));
}
