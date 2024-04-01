const mongoose = require('mongoose');
const Customer=require('../model/customerModel');

//code for post request
exports.create_cust = async (req,res,next)=>{
    try{
        const custObj=new Customer({
            _id:new mongoose.Types.ObjectId,
            booking:req.body.bookingId,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            phone_number:req.body.phone_number,
            age:req.body.age,
            email:req.body.email,
            address:req.body.address,
            city:req.body.city,
            zipcode:req.body.zipcode
        });
        const data = await custObj.save();
        
        res.status(200).json({
            code:1,
            msg:"Customer data added successfully",
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
//code for getting customer list 
exports.get_cust = async(req,res,next)=>{
    try{
        const data= await Customer.find();
        if(data){
            res.status(200).json({
                code:1,
                msg:"Customer List",
                data:data,
                error:null
            })}else{
                res.status(200).json({
                    code:1,
                    msg:"No data available",
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
//code for getting single customer
exports.get_cust_ById = async (req,res,next)=>{
    try{
        const data = await Customer.findById(req.params.custId);
        if(data){
            res.status(200).json({
                code:1,
                msg:"Single Customer Data",
                data:data,
                error:null
            })
        }else{
            res.status(200).json({
                code:1,
                msg:"No customer information available with given Id",
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
//code for updating single customer
exports.update_cust_ById=async(req,res,next)=>{
    try{
        const data = await Customer.findByIdAndUpdate(req.params.custId,req.body,{new:true,runValidator:true});
        res.status(200).json({
            code:1,
            msg:"Update Single Customer Data",
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
//code for deleting single customer
exports.delete_cust_ById=async(req,res,next)=>{
    try{
        const data = await Customer.findByIdAndDelete(req.params.custId);
        if(!data){res.status(404).json({
            code:1,
            msg:"No customer information available in given Id",
            data:data,
            error:null
        })}else{
            res.status(404).json({
                code:1,
                msg:"Delete request performed successfully",
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