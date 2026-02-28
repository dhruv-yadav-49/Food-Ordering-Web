const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientController.js');
const authenticate = require('../middleware/authenticate.js');

router.post('/category',authenticate, ingredientsController.createIngredientCategory);
router.post('',authenticate, ingredientsController.createIngredientsItem);
router.get('/restaurant/:id',authenticate,ingredientsController.restaurantsIngredient)
router.get('/restaurant/:id/category',authenticate, ingredientsController.restaurantsIngredientsCategory);
router.put('/:id/stoke',authenticate, ingredientsController.updateStoke);