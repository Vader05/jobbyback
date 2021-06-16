var User = require('../models/user');

exports.userLIst = function(req, res){
    User.find({}, function(err, user){
        if(err) console.log(err);
        res.status(200).json(user);
    });
}


exports.user_create = function(req, res){
    User.create(req.body)
    .then((users) => {
        console.log('User Created ', users)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(users)
    }, (err) => next(err))
    .catch((err) => next(err))
}