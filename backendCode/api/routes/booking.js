
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
 
const bookModelRequest = require('../controller/booking.model')
 
 
 
//get request
router.get("/",bookModelRequest.get_books);
 
 
 
//post request for book
router.post("/",upload.single('bookImg'),bookModelRequest.create_book);
 
 
//put request
router.put("/:bookId",bookModelRequest.update_book);
 
 
 
//get for single book
router.get("/:bookId",bookModelRequest.get_book_ById);
 
 
//delete book
router.delete("/:bookId",bookModelRequest.delete_book);
 
 
module.exports = router;