const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const employeeSchema = Schema({
    _id:Schema.Types.ObjectId,
    empId: {type:String,require:true},
    empName: {type:String,require:true},
    empPost: {type:String,require:true},
    empGender: {type:String,require:true},
    empSalary: {type:String,require:true},
    empAddress: {type:String,require:true},
})
module.exports=mongoose.model("Employee", employeeSchema);