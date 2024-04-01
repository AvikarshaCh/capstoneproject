const mongoose = require('mongoose');
const Product=require('../model/productModel');


//code for post request
exports.create_product = async (req,res,next)=>{
    try{
        const prodObj=new Product({
            _id:new mongoose.Types.ObjectId,
            name:req.body.name,
            price:req.body.price
        });
        const data = await prodObj.save();
        
        res.status(200).json({
            code:1,
            msg:"This is simple post request",
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
exports.get_products = async(req,res,next)=>{
    try{
        const data= await Product.find();
        if(data){
            res.status(200).json({
                code:1,
                msg:"This is simple get request for product",
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
//code for getting single product
exports.get_product_ById = async (req,res,next)=>{
    try{
        const data = await Product.findById(req.params.productId);
        if(data){
            res.status(200).json({
                code:1,
                msg:"This is get request for single product",
                data:data,
                error:null
            })
        }else{
            res.status(200).json({
                code:1,
                msg:"No product information available with given Id",
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
//code for updating single product
exports.update_product_ById=async(req,res,next)=>{
    try{
        const data = await Product.findByIdAndUpdate(req.params.productId,req.body,{new:true,runValidator:true});
        res.status(200).json({
            code:1,
            msg:"This is put request for single product",
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
//code for deleting single product
exports.delete_product_ById=async(req,res,next)=>{
    try{
        const data = await Product.findByIdAndDelete(req.params.productId);
        if(!data){res.status(404).json({
            code:1,
            msg:"No product information available in given Id",
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