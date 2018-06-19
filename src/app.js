const express = require('express');
const bookRoutesFactory = require('./bookRoutes');
const { clientError, serverError } = require('./error');
const bodyParser = require('body-parser');
const path = require("path");

module.exports = async function() {
    const bookRoutes = await bookRoutesFactory();
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
        next();
    });

    app.get("/", function(req, res) {
        res.send("Hello world!");
    });

    app.use("/book", bookRoutes);

    app.use(clientError);
    app.use(serverError);

    return app;
};