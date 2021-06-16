const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const EmployeeSchema = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    name: {
       type: String,
       required: true
    },
    job: {
        type: String,
        required: true
    },
    salary: {
        type: Currency,
        required: true,
        min: 900
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;