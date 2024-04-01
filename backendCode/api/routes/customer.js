
const express = require ('express');
const router = express.Router();
const multer  = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})
 
const customerModelRequest = require('../controller/customer.model')
 
 
 
//get request
router.get("/",customerModelRequest.get_cust);
 
 
 
//post request for customer
router.post("/",upload.single('custImg'),customerModelRequest.create_cust);

 
//put request
router.put("/:custId",customerModelRequest.update_cust_ById);
 
 
 
//get for single customer
router.get("/:custId",customerModelRequest.get_cust_ById);
 
 
//delete customer info
router.delete("/:custId",customerModelRequest.delete_cust_ById);
 
 
module.exports = router;