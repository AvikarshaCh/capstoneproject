const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
 
const bookSchema = Schema({
    _id:Schema.Types.ObjectId,
    carType:{type:String,require:true},
    pickupL:{type:String,require:true},
    pickupD:{type:String,require:true},
    dropOffL:{type:String,require:true},
    dropOffD:{type:String,require:true},
})
 
module.exports = mongoose.model("book",bookSchema)