const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
  throw new Error('Er');
  res.send("Hello world!");
});

app.post("/book", function(req, res) {
  const {title, authors, isbn, description} = req.body;
  res.json({title, authors, isbn, description});
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.json({message: err.message, err: err.stack});
})

app.listen(3000, function () {
  console.log("Listening on port: " + 3000);
})
