const express=require('express');
const router = express.Router();
const orderModelRequest=require('../controller/order.model')


//get request for product
// router.get("/",(req, res, next)=>{
//     res.status(200).json({
//         msg:"This is simple get request"
//     })
// })
router.get("/",orderModelRequest.get_orders)

//post request for product
// router.post("/",(req, res, next)=>{
//     const orderObj={
//         productId:req.body.productId,
//         quantity:req.body.quantity
//     }
//     res.status(200).json({
//         msg:"This is simple post request",
//         order:  orderObj
//     })
// })
router.post("/",orderModelRequest.create_order)

//get request for single product
// router.get("/:orderId",(req, res, next)=>{
//     res.status(200).json({
//         msg:"This is simple get request for single order"
//     })
// })
router.get("/:orderId",orderModelRequest.get_order_ById)
//put request for single product
// router.put("/:orderId",(req, res, next)=>{
//     res.status(200).json({
//         msg:"This is simple put request for single order"
//     })
// })
//delete request for single product
// router.delete("/:orderId",(req, res, next)=>{
//     res.status(200).json({
//         msg:"This is simple delete request for single order"
//     })
// })
router.delete("/:orderId",orderModelRequest.delete_order_ById)

module.exports=router;