const mongoose = require('mongoose');
const Employee = require('../model/employeeModel');

//code for post request
exports.add_emp = async (req,res,next)=>{
    try{
        const empObj=new Employee({
            _id:new mongoose.Types.ObjectId,
            empId:req.body.empId,
            empName:req.body.empName,
            empPost:req.body.empPost,
            empGender:req.body.empGender,
            empSalary:req.body.empSalary,
            empAddress:req.body.empAddress,
        });
        const data = await empObj.save();
        
        res.status(200).json({
            code:1,
            msg:"Employee Record added successfully",
            data: data,
            error:null
        });
    }catch(err){
        res.status(500).json({
            code:0,
            msg:"Something went wrong",
            data: null,
            error:err
        });
    }
}
//code for getting employee list 
exports.get_emp = async(req,res,next)=>{
    try{
        const data= await Employee.find();
        if(data){
            res.status(200).json({
                code:1,
                msg:"View Employee List",
                data:data,
                error:null
            })}else{
                res.status(200).json({
                    code:1,
                    msg:"No record available",
                    data:null,
                    error:null
                })
            }
        
    }catch(error){
        res.status(500).json({
            code:0,
            msg:"Something went wrong",
            data:null,
            error:error
        })
    }
}
//code for getting single employee
exports.get_emp_ById = async (req,res,next)=>{
    try{
        const data = await Employee.findById(req.params.empId);
        if(data){
            res.status(200).json({
                code:1,
                msg:"Single Employee Record",
                data:data,
                error:null
            })
        }else{
            res.status(200).json({
                code:1,
                msg:"No Employee Record available with given Id",
                data:null,
                error:null
            })
        }
    }catch(error){
        res.status(500).json({
            code:0,
            msg:"Something went wrong",
            data:null,
            error:error
        })
    }
}
//code for updating single employee
exports.update_emp_ById=async(req,res,next)=>{
    try{
        const data = await Employee.findByIdAndUpdate(req.params.empId,req.body,{new:true,runValidator:true});
        res.status(200).json({
            code:1,
            msg:"Single Employee Record updated successfully",
            data:data,
            error:null
        })
    }catch(error){
        res.status(500).json({
            code:1,
            msg:"Something went wrong",
            data:null,
            error:error
        })
    }
}
//code for deleting single employee
exports.delete_emp_ById=async(req,res,next)=>{
    try{
        const data = await Employee.findByIdAndDelete(req.params.empId);
        if(!data){res.status(404).json({
            code:1,
            msg:"No Employee Record available in given Id",
            data:data,
            error:null
        })}else{
            res.status(404).json({
                code:1,
                msg:" Employee Record deleted successfully",
                data:data,
                error:null
            })
        }
    }catch(error){
        res.status(500).json({
            code:1,
            msg:"Something went wrong",
            data:null,
            error:error
        })
    }
}