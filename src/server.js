const config = require("./config");

(async function main() {
  const app = await require("./app")(config);

  app.listen(config.port, function () {
    console.log("Listening on port: " + config.port);
  })
})();
