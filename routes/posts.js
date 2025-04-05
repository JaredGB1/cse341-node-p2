const routes=require('express').Router();
const controller=require("../controllers/postControl");
const errorHandler = require('../middlewares/errorHandler');
const validatePost = require('../middlewares/validatePosts'); 

routes.get('/', controller.getAll);

routes.get('/:id', controller.getSingle);

routes.post('/', validatePost, controller.createPost);

routes.put('/:id', validatePost, controller.updatePost);

routes.delete('/:id', controller.deletePost);

routes.use(errorHandler)

module.exports= routes;