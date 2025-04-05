const routes=require('express').Router();
const userController=require("../controllers/userControl");
const postController=require("../controllers/postControl");  

routes.use('/', require('./swagger'));

routes.get('/', (req,res)=>
    {
        // #swagger.tags=[Hello World]
        res.send('Hello World');
    });

routes.use('/users' , require('./users'));
routes.use('/posts' , require('./posts'));


module.exports= routes;