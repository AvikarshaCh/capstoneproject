const mongoose = require('mongoose');
const Order=require('../model/orderModel');

//code for post request
exports.create_order = async (req,res,next)=>{
    try{
        const orderObj=new Order({
            _id:new mongoose.Types.ObjectId,
            product:req.body.productId,
            quantity:req.body.quantity
        });
        const data = await orderObj.save();
        
        res.status(200).json({
            code:1,
            msg:"Order created successfully",
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
//code for getting product list 
exports.get_orders = async(req,res,next)=>{
    try{
        const data= await Order.find();
        if(data){
            res.status(200).json({
                code:1,
                msg:"This is simple get request for orders",
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
exports.get_order_ById = async (req,res,next)=>{
    try{
        const data = await Order.findById(req.params.orderId);
        if(data){
            res.status(200).json({
                code:1,
                msg:"This is get request for single order",
                data:data,
                error:null
            })
        }else{
            res.status(200).json({
                code:1,
                msg:"No order information available with given Id",
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
//code for deleting single product
exports.delete_order_ById=async(req,res,next)=>{
    try{
        const data = await Order.findByIdAndDelete(req.params.orderId);
        if(!data){res.status(404).json({
            code:1,
            msg:"No order information available in given Id",
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