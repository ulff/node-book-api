const responses = require('./responses');

function withErrorHandling(api) {
  const apiWithErrorHandling = {};
  Object.keys(api).forEach(function(key) {
    const originalFn = api[key];
    apiWithErrorHandling[key] = wrapWithTryCatch(originalFn);
  });
  return apiWithErrorHandling;
}

function wrapWithTryCatch(fn) {
  return async function(req, res, next) {
    try {
      return await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = function bookControllerFactory({ bookRepository, bookService }) {
  return withErrorHandling({
      async createOrUpdate(req, res, next) {
        const book = req.body;
        await bookService.createOrUpdate(book);
        responses.createOrUpdate(book.isbn, res);
      },
      async details(req, res, next) {
        const isbn = req.params.isbn;
        const book = await bookRepository.findOne(isbn);
        
        responses.details(book, res, next);   
      },
      async getList(req, res) {
        const listCriteria = {sort, sortBy} = req.query;
        const books = await bookRepository.findBy(listCriteria);
        responses.list(books, res);
      }
  });
};
