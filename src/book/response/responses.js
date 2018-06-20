const booksViewModel = require("./booksViewModel");

module.exports = {
  createOrUpdate: function(isbn, res) {
    res.redirect(bookLink(isbn));
  },
  details: function(book, res, next) {
    if (book) {
      res.format({
        "text/html"() {
          res.render("book", { book, layout: res.locals.layout });
        },
        "application/json"() {
          res.json(book);
        },
        default() {
          res.json(book);
        }
      });
    } else {
      next();
    }
  },
  list({ books, listCriteria = [], pages = [] }, res) {
    res.format({
      "text/html"() {
        res.render(
          "books",
          booksViewModel.html({
            books,
            pages,
            listCriteria,
            layout: res.locals.layout
          })
        );
      },
      "application/json"() {
        res.json(books);
      },
      default() {
        res.json(books);
      }
    });
  }
};
