var express=require('express');
var userRouter = express.Router();
var userController= require('../controllers/userControllerApi');

userRouter.route('/')
.get(userController.userLIst)
.post( userController.user_create);



module.exports = userRouter;