var path = require("path");
// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.
  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/menu", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/menu.html"));
  });
  app.get("/recipes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/recipes.html"));
  });
  app.get("/form-page", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/form-page.html"));
  });
  // index route loads index.html
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};