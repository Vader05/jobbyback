const express = require('express');
const servicesController = require('../controllers/serviceController');

const serviceRouter = express.Router();


serviceRouter.route('/')
.get( servicesController.getServices)
.post( servicesController.postServices)
.put( servicesController.putServices)
.delete( servicesController.putServices)


serviceRouter.route('/:serviceId')
.get( servicesController.getServicesById)
.post( servicesController.postServicesById)
.put( servicesController.putServicesById)
.delete(servicesController.deleteServicesById)


module.exports = serviceRouter;
