var express = require('express');
var employeeRouter = express.Router();
var employeeController= require('../controllers/employeeControllerApi');


employeeRouter.route('/')
.get(employeeController.employeeLIst)
.post(employeeController.employee_create);


module.exports = employeeRouter;