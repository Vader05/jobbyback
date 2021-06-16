var Client = require('../models/client');

exports.clientLIst = function(req, res){
    Client.find({}, function(err, client){
        if(err) console.log(err);
        res.status(200).json(client);
    });
}

exports.client_create = function(req, res){
    var client= new Client({dniClient: req.body.dniClient, name: req.body.name, telephone: req.body.telephone, email: req.body.email, user:req.body.user});
    client.save(function(err, result){
        if(err) return res.status(500).json(err);
        res.status(200).json(result); 
    });
}

exports.clientAddClaim= function(req, res){
    Client.findById(req.body.id).then(client=>{
        if(client!=null){
            console.log(req.body);
            client.claim.push({type:req.body.type, description:req.body.description})
            client.save().then(result=>{
                res.json(result);
            }).catch(err=>{
                res.json(err);
            })
        }
    }).catch(error=>{
        console.log(error);
    });
}

exports.clientAddService = function(req,res){
    Client.findById(req.body.clientId).then(client=>{
        if(client!=null){
            client.service.push(
            {
                serviceId: req.body.serviceId, 
                state: req.body.state
            })
            client.save().then(data=>{
                res.json(data);
            }).catch(err=>{
                res.json(err);
            })
        }
    }).catch(error=>{
        console.log(error);
    });
}

exports.findClientById= function(req, res){
    Client.findById(req.body.id, function(err, result){
        if(err) console.log(err);
        if(result!=null){
            res.status(200).json(result);
        }else{
            res.status(500).json(err);
        }
    });
}

exports.removeClaim= function(req, res){
    Client.updateOne({'_id':req.body.id},{"$pull":{"claim":{"_id": req.body.idclaim}}},function(err, afect){
        if(err) console.log(err);
            if(afect.nModified >0){
                console.log(afect);
                res.status(204).send();
            }else{
                res.status(404).json({
                    "success": false,
                    "msg": "no se encontro el reclamo"
                });
            } 
    });
    
}

exports.findClientByUser= function(req, res){
    Client.find({user: req.params.id}, function(err, result){
        if(err){
            console.log(err);
        }
            
        res.status(200).json(result);
        console.log(result)
    });
   
}

exports.removeService = function(req, res){
    Client.updateOne({'_id': req.body.id},{"$pull":{"service":{"_id": req.body.idservice}}},function(err, afect){
        if(err) console.log(err);
            if(afect.nModified >0){
                res.status(204);
                res.json(afect);
            }else{
                res.status(404).json({
                    "success": false,
                    "msg": "no se encontro el servicio "
                });
            } 
    })
}

exports.updateStatusclaim= function(req, res){
    Client.updateOne({'_id':req.body.id, 'claim._id':req.body.idclaim},{"$set":{"claim.$.state": req.body.state, "claim.$.reply":req.body.reply}}, function(err, afect){
        if(err) console.log(err);
        console.log(afect);
        if(afect.nModified>0){
            console.log(afect);
            res.status(204).send();
        }else{
            res.status(404).json({
                "success": false,
                "msg": "no se econotro el reclamo"
            })
        }
    });
}

exports.updateService= function(req, res){
    var data= req.body;
    console.log(req.body)
    Client.updateOne({'_id':data.id, 'service._id':data.idservice},{'$set':{'service.$.state':data.state, 'service.$.employeeId':data.idemployee,'service.$.supportDate': new Date()}}, function(err, afect){
        if(err) console.log(err);
        console.log(afect);
        if(afect.nModified>0){
            console.log(afect);
            res.status(204).send();
        }else{
            res.status(404).json({
                'success':false,
                'msg':"no se encontro el servicio"
            })
        }
    });
}

