const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const customerSchema = Schema({
    _id:Schema.Types.ObjectId,
    booking: {type: Schema.Types.ObjectId,ref:"Booking",require:true},
    first_name: {type:String,require:true},
    last_name: {type:String,require:true},
    phone_number: {type:String,require:true},
    age: {type:Number,default:18},
    email: {type:String,require:true},
    address: {type:String,require:true},
    city: {type:String,require:true},
    zipcode: {type:Number,require:true},
})
module.exports=mongoose.model("Customer", customerSchema);