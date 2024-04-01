const mongoose = require('mongoose');
const User = require('../model/userModel');

//code for post request
exports.add_user = async (req,res,next)=>{
    try{
        const prodObj=new User({
            _id:new mongoose.Types.ObjectId,
            email:req.body.email,
            password:req.body.password
        });
        const data = await prodObj.save();
        
        res.status(200).json({
            code:1,
            msg:"User added successfully",
            createdProduct: data,
            error:null
        });
    }catch(err){
        res.status(500).json({
            code:0,
            msg:"Something went wrong",
            createdProduct: null,
            error:err
        });
    }
}
//code for getting product list 
exports.get_user = async(req,res,next)=>{
    try{
        const data= await User.find();
        if(data){
            res.status(200).json({
                code:1,
                msg:"View User List",
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
//code for getting single user
exports.get_user_ById = async (req,res,next)=>{
    try{
        const data = await User.findById(req.params.userId);
        if(data){
            res.status(200).json({
                code:1,
                msg:"Single user information",
                data:data,
                error:null
            })
        }else{
            res.status(200).json({
                code:1,
                msg:"No user information available with given Id",
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
//code for updating single user
exports.update_user_ById=async(req,res,next)=>{
    try{
        const data = await User.findByIdAndUpdate(req.params.userId,req.body,{new:true,runValidator:true});
        res.status(200).json({
            code:1,
            msg:"Single user information updated successfully",
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
//code for deleting single user
exports.delete_user_ById=async(req,res,next)=>{
    try{
        const data = await User.findByIdAndDelete(req.params.userId);
        if(!data){res.status(404).json({
            code:1,
            msg:"No user information available in given Id",
            data:data,
            error:null
        })}else{
            res.status(404).json({
                code:1,
                msg:" User information deleted successfully",
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