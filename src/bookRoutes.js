const connectionFactory = require("./connection");
const bookRepositoryFactory = require("./bookRepository");
const bookServiceFactory = require("./bookService");
const bookControllerFactory = require("./bookController");
const {Router} = require('express');
const layoutDecorator = require('./layoutDecorator');
const { BOOK, BOOK_COLLECTION, SEARCH } = require('./links').resources;

module.exports = async function routerFactory() {
    const router = Router();

    const db = await connectionFactory("mongodb://localhost:27017/booksapi");
    const bookRepository = bookRepositoryFactory(db);
    const bookService = bookServiceFactory(bookRepository);
    const {createOrUpdate, details, getList, search} = bookControllerFactory({bookRepository, bookService});

    router.use(layoutDecorator);
    router.post(BOOK_COLLECTION, createOrUpdate);
    router.get(BOOK, details);
    router.get(BOOK_COLLECTION, getList);
    router.get(SEARCH, search);

    bookRepository.buildIndex();

    return router;
};
