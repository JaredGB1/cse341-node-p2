const routes=require('express').Router();
const controller=require("../controllers/postControl");
const errorHandler = require('../middlewares/errorHandler');
const validatePost = require('../middlewares/validatePosts');
const { IsAuthenticated } = require("../middlewares/authenticate"); 

routes.get('/', controller.getAll);

routes.get('/:id', controller.getSingle);

routes.post('/', IsAuthenticated, validatePost, controller.createPost);

routes.put('/:id', IsAuthenticated, validatePost, controller.updatePost);

routes.delete('/:id', IsAuthenticated, controller.deletePost);

routes.use(errorHandler)

module.exports= routes;