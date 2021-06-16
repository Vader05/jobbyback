const Services = require('../models/service');

exports.getServices = (req, res, next) => {
    Services.find({})
    .then((services) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(services) 
    }, (err) => next(err)) 
    .catch((err) => next(err))
}

exports.postServices = (req, res, next) => {
    Services.create(req.body)
    .then((services) => {
        console.log('Service Created ', services)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(services)
    }, (err) => next(err))
    .catch((err) => next(err))
}

exports.putServices = (req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /services')
}

exports.putServices = (req, res, next) => {
    Services.remove({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
}

//FindById

exports.getServicesById = (req, res, next) => {
    Services.findById(req.params.serviceId)
    .then((service) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(service)
    }, (err) => next(err))
    .catch((err) => next(err))
}

exports.postServicesById = (req, res, next) => {
    res.statusCode = 403 
    res.end(`POST operation not supported on /services/${req.params.serviceId}`)
}

exports.putServicesById = (req, res, next) => {
    Services.findByIdAndUpdate(req.params.serviceId, {
        $set: req.body
    }, { new: true }) 
    .then((service) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(service)
    }, (err) => next(err))
    .catch((err) => next(err))
}

exports.deleteServicesById = (req, res, next) => {
    Services.findByIdAndRemove(req.params.serviceId)
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
}