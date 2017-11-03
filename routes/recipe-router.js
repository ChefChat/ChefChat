import express from 'express';
import recipeController from '../controllers';

const router = express.Router();

router.get('/', recipeController.getRecipes);

router.post('/', recipeController.addRecipe);

router.delete('/:id', recipeController.deleteRecipe);

router.put('/:id', recipeController.updateRecipe);

router.post('/:id/review', recipeController.addReview);

router.put('/:id/upvote', recipeController.upvoteRecipe);

router.put('/:id/downvote', recipeController.downvoteRecipe);


module.exports = router;