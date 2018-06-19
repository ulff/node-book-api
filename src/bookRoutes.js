const connectionFactory = require("./connection");
const bookRepositoryFactory = require("./bookRepository");
const bookServiceFactory = require("./bookService");
const bookControllerFactory = require("./bookController");
const {Router} = require('express');

module.exports = async function routerFactory() {
    const router = Router();

    const db = await connectionFactory("mongodb://localhost:27017/booksapi");
    const bookRepository = bookRepositoryFactory(db);
    const bookService = bookServiceFactory(bookRepository);
    const {createOrUpdate, details, getList} = bookControllerFactory({bookRepository, bookService});

    router.post("/", createOrUpdate);
    router.get("/:isbn", details);
    router.get("/", getList);

    return router;
};
