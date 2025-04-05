const routes=require('express').Router();
const controller=require("../controllers/userControl");
const errorHandler = require('../middlewares/errorHandler');
const validateUser = require('../middlewares/validateUsers'); 

routes.get('/', controller.getAll);

routes.get('/:id', controller.getSingle);

routes.post('/', validateUser, controller.createUser);

routes.put('/:id', validateUser, controller.updateUser);

routes.delete('/:id', controller.deleteUser);

routes.use(errorHandler)

module.exports= routes;