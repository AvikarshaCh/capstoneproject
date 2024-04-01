const mongoose = require('mongoose')
const Book = require('../model/bookingModel');
 
 
//code for post request
exports.create_book = async (req, res, next) => {
    try {
        const bookObj = new Book({
            _id: new mongoose.Types.ObjectId(),
            carType: req.body.carType,
            pickupL: req.body.pickupL,
            pickupD: req.body.pickupD,
            dropOffL: req.body.dropOffL,
            dropOffD: req.body.dropOffD
        })
       
        const data = await bookObj.save()
        res.status(200).json({
            code: 1,
            msg: "book created successfully",
            createdbook: data,
            error: null
        });
    } catch (err) {
        res.status(500).json({
            code: 0,
            msg: "Kuch galat hua",
            createdbook: null,
            error: err
        });
    }
}
 
 
//code for get book list
exports.get_books = async (req, res, next) => {
    try {
        const data = await Book.find();
        if (data) {
            res.status(200).json({
                code: 1,
                msg: "This is simple get request for book",
                data: data,
                error: null
            })
        } else {
            res.status(200).json({
                code: 1,
                msg: "No data found",
                data: null,
                error: null
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 0,
            msg: "Kuch galat hua",
            data: null,
            error: error
        })
    }
}
 
//code for getting single book
exports.get_book_ById = async (req, res, next) => {
    try {
        const data = await Book.findById(req.params.bookId);
        if (data) {
            res.status(200).json({
                code: 1,
                msg: "This is simple get request for one book",
                data: data,
                error: null
            })
        }else{
            res.status(200).json({
                code: 1,
                msg: "No book available for given ID",
                data: null,
                error: null
            })
        }
 
    } catch (error) {
        res.status(500).json({
            code: 0,
            msg: "Kuch galat hua",
            data: null,
            error: error
        })
    }
}
 
//code for update single book
exports.update_book = async (req, res, next) => {
    try {
        const data = await Book.findByIdAndUpdate(req.params.bookId,req.body,{new:true,runValidator:true});
        if (data) {
            res.status(200).json({
                code: 1,
                msg: "This is simple put request for single book",
                data: data,
                error: null
            })
        }else{
            res.status(200).json({
                code: 1,
                msg: "No book available for given ID",
                data: null,
                error: null
            })
        }
 
    } catch (error) {
        res.status(500).json({
            code: 0,
            msg: "Kuch galat hua",
            data: null,
            error: error
        })
    }
}
 
 
//code for delete single book
exports.delete_book = async (req, res, next) => {
    try {
        const data = await Book.findByIdAndDelete(req.params.bookId);
        if (!data) {
            res.status(404).json({
                code: 1,
                msg: "No book found",
                data: data,
                error: null
            })
        }else{
            res.status(404).json({
                code: 1,
                msg: "Data Deleted",
                data: data,
                error: null
            })
        }
 
    } catch (error) {
        res.status(500).json({
            code: 0,
            msg: "Kuch galat hua",
            data: null,
            error: error
        })
    }
}
 