
// *** This file is the initial starting point for the Node/Express server.

// *** Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var Sequelize = require("sequelize");
var passport = require("./config/passport");
var session = require("express-session");
var chart = require("chart.js");

// *** Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// *** Requiring our models for syncing
var db = require("./models");

// *** Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: false }));

// *** Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// *** Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// *** Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// *** Routes
require("./routes/html-routes.js")(app);
require("./routes/auth-routes.js")(app);
require("./routes/recipe-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);


// *** Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});