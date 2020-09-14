// Dependencies
var express = require('express');
var bodyParser = require('body-parser');

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Sets the routes of files
require("./app/routing/htmlRoutes.js") (app);
require("./app/routing/apiRoutes.js") (app);

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });