const express = require('express');
const bookRoutes = require('./bookRoutes');
const { clientError, serverError } = require('./error');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log("Logging new request at " + new Date());
  next();
});

app.use(function(req, res, next) {
  console.log("Doing auth");
  // next(new Error("Auth error"));
  next();
});

app.get("/", function(req, res) {
    // throw new Error('Er');
    res.send("Hello world!");
  });

app.use("/book", bookRoutes);

app.use(clientError);
app.use(serverError);

module.exports = app;