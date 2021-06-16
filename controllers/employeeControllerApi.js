var Employee = require('../models/employee');

exports.employeeLIst = function(req, res){
    Employee.find({}, function(err, employee){
        if(err) console.log(err);
        res.status(200).json({
            employees: employee
        });
    });
}

exports.employee_create = function(req, res){
    var empl= new Employee({employeeId: req.body.employeeId, name: req.body.name, job: req.body.job, salary: req.body.salary});
    empl.save(function(err, result){
        if(err) return res.status(500).json(err);
        res.status(200).json(result); 
    });
}