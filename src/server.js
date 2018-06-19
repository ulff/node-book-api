const appFactory = require("./app");

(async function main() {
  const app = await appFactory();

  app.listen(3000, function () {
    console.log("Listening on port: " + 3000);
  })
})();
