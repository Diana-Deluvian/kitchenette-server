const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: String,
  category: String,
  imgUrl: String,
  imgId: String,
  cookTime: String,
  calories: String,
  servings: String,
  cost: String,
  ingredients: [String],
  instructions: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
