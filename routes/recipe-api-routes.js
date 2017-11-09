
// Requiring our models
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the recipes
  app.get("/api/recipes", function(req, res) {
    var query = {};
    if (req.query.UserId) {
      query.UserId = req.query.UserId;
    }
    // Here we add an "include" property to our options in our findAll query
    // set the value to an array of the models to include in a left outer join
    // db.User
    db.recipe.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbrecipe) {
      res.json(dbrecipe);
    });
  });

  // Get rotue for retrieving a single recipe
  app.get("/api/recipes/:id", function(req, res) {
    //add an "include" property in our findOne query
    //set the value to an array of the models to include in a left outer join
    // db.User
    db.recipe.findAll({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbrecipe) {
      res.json(dbrecipe);
    });
  });

   // Get rotue for retrieving a single user's recipes
  app.get("/api/userrecipes/:id", function(req, res) {
    db.recipe.findAll({
      where: {
        UserId: req.params.id
      },
      include: [db.User]
    }).then(function(dbrecipe) {
      res.json(dbrecipe);
    });
  });

  // POST route for saving a new recipe
  app.post("/api/recipes", function(req, res) {
    
    console.log(req.body);

    db.recipe.create(req.body).then(function(dbrecipe) {
      res.json(dbrecipe);
    });
  });

  // DELETE route for deleting recipes
  app.delete("/api/recipes/:id", function(req, res) {
    db.recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbrecipe) {
      res.json(dbrecipe);
    });
  });

  // PUT route for updating recipes
  app.put("/api/recipes", function(req, res) {
    db.recipe.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbrecipe) {
        res.json(dbrecipe);
      });
  });
};