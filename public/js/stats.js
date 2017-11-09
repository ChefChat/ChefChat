$(document).ready(function() {

$("button.btn-stats").on("click", function() {
  $.ajax({
    url: "/api/recipes/", 
    type: "GET",
    success: function(data) {
      // console.log(data);

      var userId = $("#recipesContainer").data("uid");
      // console.log(userId);

      $.get("/api/userrecipes/" + userId, function(data) {
        // console.log("recipes", data);
        recipes = data;
        if (!recipes || !recipes.length) {
          // console.log("You haven't logged any recipes yet!");
        } else {
          console.log("Yes!");
        }
        //console.log(recipes[1].recipeType);
      });

      var ctx = $("#myChart");

      var recipeType = [0, 0, 0, 0, 0, 0];
      
      for (var i = 0; i < recipes.length; i++) {
        switch (recipes[i].recipeType) {
          case "Appetizers":
            recipeType[0]++;
            break;
          case "Breakfast":
            recipeType[1]++;
            break;
          case "Holidays":
            recipeType[2]++;
            break;
          case "Lunch":
            recipeType[3]++;
            break;
          case "Dinner":
            recipeType[4]++;
            break;
          case "Desserts":
            recipeType[5]++;
            break;
        }
      }

      var chartData = {
        labels: ["Appetizers", "Breakfast", "Holidays", "Lunch", "Dinner", "Desserts"],
        datasets: [
          {
            label: "Key",
            data: recipeType,
            backgroundColor: [
              "#E13C14",
              "#A9A9A9",
              "#F06442",
              "#424242",
              "#8B1B00",
              "#B22808"]
          }
        ]
      };
      console.log(recipes);

      console.log(recipeType);


      console.log(recipes[1].recipeType);

      var options = {
        title: {
          display: true,
          position: "top",
          text: "Recipes by Category",
          fontSize: 18,
          fontColor: "#111"
        },
        legend: {
          display: true,
          position: "bottom"
        }
      };

      var chart = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: options
      });

      },
      error: function(chartData) {
        console.log(chartData);
      }
  });

});
});