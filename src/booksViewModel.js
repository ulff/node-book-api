const { bookLink, sortLinks } = require('./links');

module.exports = {
  html({books, listCriteria, layout}) {
    return {books: withLinks(books), sortLinks: sortLinks(listCriteria.sort), layout};
  }
};

function withLinks(books) {
  return books.map(book => ({...book, link: bookLink(book.isbn)}));
}
