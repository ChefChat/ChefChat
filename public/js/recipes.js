$(document).ready(function() {

  // recipeContainer holds all of our recipes
  var recipeContainer = $("#recipesDisplay");
  var recipeCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlerecipeDelete);
  $(document).on("click", "button.edit", handlerecipeEdit);
  // Variable to hold our recipes
  var recipes;

  // The code below handles the case where we want to get recipe recipes for a specific user
  var userId = $("#recipesContainer").data("uid"); 
  getrecipes(userId);


  // This function grabs recipes from the database and updates the view
  function getrecipes(userid) {

    $.get("/api/userrecipes/" + userId, function(data) {
      console.log("recipes", data);
      recipes = data;
      if (!recipes || !recipes.length) {
        displayEmpty(userid);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete recipes
  function deleterecipe(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/recipes/" + id
    })
    .done(function() {
      getrecipes(recipeCategorySelect.val());
    });
  }

  // This function does an API call to edit recipes
  function editrecipe(id) {
    $.ajax({
      method: "PUT",
      url: "/api/recipes/" + id
    })
    .done(function() {
      getrecipes(recipeCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed recipe HTML inside recipeContainer
  function initializeRows() {
    recipeContainer.empty();
    var recipesToAdd = [];
    for (var i = 0; i < recipes.length; i++) {
      recipesToAdd.push(createNewRow(recipes[i]));
    }
    recipeContainer.append(recipesToAdd);
  }

  // This function constructs a recipe's HTML
  function createNewRow(recipe) {
   // var formattedDate = new Date(recipe.createdAt);
   // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newrecipePanel = $("<div class='recipe-panel' data-id='"+recipe.id+"'>");
    newrecipePanel.addClass("panel panel-default");
    var newrecipePanelHeading = $("<div>");
    newrecipePanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("Delete");
    deleteBtn.addClass("delete btn btn-danger btn-sm");
    var editBtn = $("<button>");
    editBtn.text("Edit");
    editBtn.addClass("edit btn btn-warning btn-sm");
    var newrecipeTitle = $("<h2>");
    var newrecipePanelBody = $("<div>");
    newrecipePanelBody.addClass("panel-body");
    var newrecipeBody = $("<div>");
    newrecipeTitle.text(recipe.recipeName + " | " + recipe.recipeType + " | " + recipe.rating + "/10");
    newrecipeBody.html("<b>SERVINGS: </b>" + recipe.servingSize + "<br>" + "<b>COOK TIME: </b>" + recipe.cookTime + " minutes"
      + "<br><br>" + "<b>INGREDIENTS: </b>" + recipe.ingredients + "<br><br>" + "<b>DIRECTIONS: </b>" + recipe.directions + "<br><br>" + "<b>NOTES: </b>" + recipe.notes + "<br><br>");
    newrecipePanelHeading.append(newrecipeTitle);
    newrecipePanelBody.append(newrecipeBody);
    newrecipePanelBody.append(editBtn);
    newrecipePanelBody.append(deleteBtn);
    newrecipePanel.append(newrecipePanelHeading);
    newrecipePanel.append(newrecipePanelBody);
    return newrecipePanel;
  }

  // This function figures out which recipe we want to delete and then calls deleterecipe
  function handlerecipeDelete() {
    var currentrecipe = $(this).parents(".recipe-panel").data("id");
    deleterecipe(currentrecipe);
  }

  // This function figures out which recipe we want to edit and takes it to the appropriate url
  function handlerecipeEdit() {
    var currentrecipe = $(this).parents(".recipe-panel").data("id");
    editrecipe(currentrecipe);
  }

  // This function
  //function editrecipe(id) {
    //console.log(id);
  //}

  // This function displays a messgae when there are no recipes
  function displayEmpty(id) {
    var norecipesYet = $("<p>");
    norecipesYet.text("Click above to get started!");
    newrecipePanelBody.append(norecipesYet);
  }

  var recipesDisplay = $("#addrecipe");

  function handleFormSubmit(event) { 
    event.preventDefault();

    // Getting jQuery references to the recipe data, form, and user select
    var recipeData = {
          recipeName: $("#recipeName").val().trim(),
          recipeType: $("#recipeType").val().trim(),
          servingSize: $("#servingSize").val().trim(),
          cookTime: $("#cookTime").val().trim(),
          ingredients: $("#ingredients").val().trim(),
          directions: $("#recipeDirections").val().trim(),
          rating: $("#recipeRating").val().trim(),
          notes: $("#recipeNotes").val().trim()
    };

    //get the recipe
    // Wont submit the recipe if we are missing a recipe name or user
    if (!recipeData.recipeName) {
      alert("Need a recipe name"); //FIXME, put error message on page.
      return;
    } 
    console.log("got it: ");
    console.log(recipeData);
    // Constructing a newrecipe object to hand to the database
    var newrecipe = recipeData;
    newrecipe.UserId = $("#recipesContainer").data("uid"); 

    // If we're updating a recipe run updaterecipe to update a recipe
    // Otherwise run submitrecipe to create a whole new recipe
    submitrecipe(newrecipe);
  }

  // Adding an event listener for when the form is submitted
  recipesDisplay.on("click", handleFormSubmit);

  // Submits a new recipe and brings user to recipes page upon completion
  function submitrecipe(recipe) {
    $.post("/api/recipes", recipe, function() {
      window.location.href = "/recipes";
    });
  }

});