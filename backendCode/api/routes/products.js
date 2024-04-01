const express=require('express');
const router = express.Router();
const multer=require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cbf)=>{
        cbf(null,'./upload/')
    },
    filename:(req,file,cbf)=>{
        cbf(null,file.originalname)
    }    
})
const upload=multer({storage:storage});
// const mongoose = require('mongoose');
// const Product=require('../model/productModel');
const productModelRequest=require('../controller/product.model')

//get request for product
// router.get("/",(req, res, next)=>{
//     res.status(200).json({
//         msg:"This is simple get request"
//     })
// })
router.get("/",productModelRequest.get_products)

//post request for product
// router.post("/",(req, res, next)=>{
//     // const prodObj={
//     //     name:req.body.name,
//     //     price:req.body.price
//     // }
    
// })
router.post("/",upload.single("prodImg"),productModelRequest.create_product);

//get request for single product
// router.get("/:productId",(req, res, next)=>{
//     res.status(200).json({
//         msg:"This is simple get request for single product"
//     })
// })
router.get("/:productId", productModelRequest.get_product_ById);

//put request for single product
// router.put("/:productId",(req, res, next)=>{
//     res.status(200).json({
//         msg:"This is simple put request for single product"
//     })
// })
router.put("/:productId",productModelRequest.update_product_ById)
//delete request for single product
// router.delete("/:productId",(req, res, next)=>{
//     res.status(200).json({
//         msg:"This is simple delete request for single product"
//     })
// })
router.delete("/:productId",productModelRequest.delete_product_ById)

module.exports=router;