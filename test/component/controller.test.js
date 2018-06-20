const assert = require("assert");
const httpClient = require("supertest");
const config = require("../../config");

const bookControllerFactory = require("../../src/book/bookController");

describe("Book inventory", function(done) {
  it("creates a book", async function() {
    // given
    const app = await require("../../src/app")(config);
    const bookService = {
      async createOrUpdate(book) {
        bookService.createOrUpdate.invokedWith = book;
      }
    };
    const bookController = bookControllerFactory({ bookService });
    const req = {
      body: {
        isbn: "ISBN"
      }
    };

    const res = {
      redirect(path) {
        res.redirect.invokedWith = path;
      }
    };

    // when
    await bookController.createOrUpdate(req, res);

    // then
    assert.equal(res.redirect.invokedWith, "/book/ISBN");
    assert.deepEqual(bookService.createOrUpdate.invokedWith, { isbn: "ISBN" });
  });

  // it('will not create a book', async function () {
  //     // given
  //     const app = await require('../../src/app')(config);
  //     const error = new Error("Something not worked");
  //     const bookService = {
  //         async createOrUpdate(book) {
  //             throw error;
  //         }
  //     };
  //     const bookController = bookControllerFactory({ bookService });
  //     const req = {
  //         body: {
  //             isbn: "ISBN"
  //         }
  //     }

  //     const res = {
  //         redirect(path) {
  //             res.redirect.invokedWith = path;
  //         }
  //     };

  //     // when
  //     await bookController.createOrUpdate(req, res);

  //     // then
  //     assert.equal(res.redirect.invokedWith, "/book/ISBN");
  //     assert.deepEqual(bookService.createOrUpdate.invokedWith, { isbn: "ISBN" })
  // });
});
