import express from 'express';

import recipe from './recipe-router';

const route = express.Router();

route.use('/recipes', recipe);

module.exports = route;