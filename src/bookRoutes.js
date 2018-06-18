const router = require('express').Router();
const bookRepository = require("./bookRepository");
const bookService = require("./bookService");
const {createOrUpdate, details} = require("./bookController")({ bookRepository, bookService });

router.post("/", createOrUpdate);
router.get("/:isbn", details);

module.exports = router;
