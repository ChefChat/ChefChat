// $(document).ready(function() {
  
//   var recipesDisplay = $("#addrecipe");
//   var userSelect = $("#user");
  
//   // Gets the part of the url that comes after the "?" (which we have if we're updating a recipe)
//   var url = window.location.search;
//   var recipeId;
//   var userId;
//   // Sets a flag for whether or not we're updating a recipe to be false initially
//   var updating = false;

//   // If we have this section in our url, we pull out the recipe id from the url
//   // In '?recipe_id=1', recipeId is 1
//   if (url.indexOf("?recipes_id=") !== -1) {
//     recipeId = url.split("=")[1];
//     getrecipeData(recipeId, "recipe");
//   }
//   // Otherwise if we have an user_id in our url, preset the user select box to be our user
//   else if (url.indexOf("?user_id=") !== -1) {
//     userId = url.split("=")[1];
//   }

//   // Getting the users, and their recipes
//   // getUsers(); // THIS IS WHAT BROKE THE DISPLAY, FIX UNDER GET USERS FUNCTION
//   // A function for handling what happens when the form to create a new recipe is submitted
//   function handleFormSubmit(event) { 
//     event.preventDefault();

//     // Getting jQuery references to the recipe data, form, and user select
//     var recipeData = {
//           recipeName: $("#recipeName").val().trim(),
//           recipeType: $("#recipeType").val().trim(),
//           servingSize: $("#servingSize").val().trim(),
//           cookTime: $("#cookTime").val().trim(),
//           ingredients: $("#ingredients").val().trim(),
//           directions: $("#recipeDirections").val().trim(),
//           rating: $("#recipeRating").val().trim(),
//           notes: $("#recipeNotes").val().trim()
//     };

//     //get the recipe
//     // Wont submit the recipe if we are missing a recipe name or user
//     if (!recipeData.recipeName) {
//       alert("Need a recipe name"); //FIXME, put error message on page.
//       return;
//     } 
//     console.log("got it: ");
//     console.log(recipeData);
//     // Constructing a newrecipe object to hand to the database
//     var newrecipe = recipeData;
//     newrecipe.UserId = userSelect.data("uid");

//     // If we're updating a recipe run updaterecipe to update a recipe
//     // Otherwise run submitrecipe to create a whole new recipe
//     if (updating) {
//       newrecipe.id = recipeId;
//       updaterecipe(newrecipe);
//     }
//     else {
//       submitrecipe(newrecipe);
//     }
//   }

//   // Adding an event listener for when the form is submitted
//   recipesDisplay.on("click", handleFormSubmit);

//   // Submits a new recipe and brings user to recipes page upon completion
//   function submitrecipe(recipe) {
//     $.post("/api/recipes", recipe, function() {
//       window.location.href = "/recipes";
//     });
//   }

//   // Gets recipe data for the current recipe if we're editing, 
//   // or if we're adding to an user's existing recipes
//   function getrecipeData(id, type) {
//     var queryUrl;
//     switch (type) {
//       case "recipe":
//         queryUrl = "/api/recipes/" + id;
//         break;
//       case "user":
//         queryUrl = "/api/users/" + id;
//         break;
//       default:
//         return;
//     }
//     $.get(queryUrl, function(data) {
//       if (data) {
//         console.log(data.userId || data.id);
//         // If this recipe exists, prefill our cms forms with its data
//         recipeName.val(data.recipeName);
//         recipeType.val(data.recipeType);
//         recipeDirections.val(data.recipeDirections);
//         servingSize.val(data.servingSize);
//         cookTime.val(data.cookTime);
//         ingredients.val(data.ingredients);
//         recipeRating.val(data.rating);
//         recipeNotes.val(data.notes);
//         userId = data.userId || data.id;
//         // If we have a recipe with this id, set a flag for us to know to update the recipe
//         // when we hit submit
//         updating = true;
//       }
//     });
//   }
//   // A function to get users and then render our list of users
//   function getUsers() {
//     $.get("/api/users", renderUserList);
//   }
//   // Function to either render a list of users, 
//    // or if there are none, direct the user to the page
//   // to create an user first
//   // function renderUserList(data) {
//   //   if (!data.length) {
//   //     window.location.href = "/";
//   //   }
//   //   $(".hidden").removeClass("hidden");
//   //   var rowsToAdd = [];
//   //   for (var i = 0; i < data.length; i++) {
//   //     rowsToAdd.push(createUserRow(data[i]));
//   //   }
//   //   console.log(rowsToAdd);
//   //   console.log(userSelect);
//   // }

//   // Creates the user options in the dropdown
//   function createUserRow(user) {
//     var listOption = $("<option>");
//     listOption.attr("value", user.id);
//     listOption.text(user.name);
//     return listOption;
//   }

//   // Update a given recipe, bring user to the recipes page when done
//   function updaterecipe(recipe) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/recipes",
//       data: recipe
//     })
//     .done(function() {
//       window.location.href = "/recipes";
//     });
//   }
// });