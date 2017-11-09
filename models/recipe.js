module.exports = function(sequelize, DataTypes) {
  
  var recipe = sequelize.define("recipe", {
      recipeName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recipeType: {
          type: DataTypes.STRING
      },
      servingSize: {
          type: DataTypes.INTEGER
      },
      cookTime: {
          type: DataTypes.INTEGER
      },
      ingredients: {
          type: DataTypes.STRING
      },
      directions: {
          type: DataTypes.STRING
      },
      rating: {
          type: DataTypes.INTEGER
      },
      notes: {
          type: DataTypes.STRING
      }, 
      UserId: {
          type:DataTypes.INTEGER
      }
  },
  {
      // User recipes
      classMethods: {
        associate: function(models) {
          // An User (foreignKey) is required or a recipe can't be made
          recipe.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return recipe;
};