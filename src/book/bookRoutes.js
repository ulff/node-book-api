const connectionFactory = require("../book/db/connection");
const bookRepositoryFactory = require("./db/bookRepository");
const bookServiceFactory = require("./domain/bookService");
const bookControllerFactory = require("./bookController");
const { Router } = require("express");
const layoutDecorator = require("../layout/layoutDecorator");
const {
  BOOK,
  BOOK_COLLECTION,
  SEARCH,
  TOP_AUTHORS
} = require("../book/response/links").resources;
const jwt = require("express-jwt");

module.exports = async function routerFactory(config) {
  const router = Router();

  const auth = jwt({ secret: config.secret });

  const db = await connectionFactory(config);
  const bookRepository = bookRepositoryFactory(db);
  const bookService = bookServiceFactory(bookRepository);
  const {
    createOrUpdate,
    details,
    getList,
    search,
    topAuthorsReport
  } = bookControllerFactory({ bookRepository, bookService });

  router.use(layoutDecorator);
  router.post(BOOK_COLLECTION, auth, createOrUpdate);
  router.get(BOOK, details);
  router.get(BOOK_COLLECTION, getList);
  router.get(SEARCH, search);
  router.get(TOP_AUTHORS, topAuthorsReport);

  bookRepository.buildIndex();

  return router;
};
