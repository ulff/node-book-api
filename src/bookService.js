const makeSlug = require("./makeSlug");
const generatePages = require('./generatePages');

module.exports = function bookServiceFactory(bookRepository) {
  return {
    createOrUpdate({title, authors, isbn, description}) {
        const slug = makeSlug(title);
        return bookRepository.createOrUpdate({title, slug, authors, isbn, description});
    },
    async getList(paginationCriteria) {
        const books = await bookRepository.findBy(paginationCriteria);
        const totalCount = await bookRepository.getCount();
        const pages = generatePages({current: paginationCriteria.start, maxPages: Math.ceil(totalCount/paginationCriteria.limit)});
        
        return {books, pages};
    }
  }
};