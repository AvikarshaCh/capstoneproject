require('dotenv').config()
const express = require('express');
const app= express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes=require('./api/routes/products')
const orderRoutes=require('./api/routes/orders')
const userRoutes=require('./api/routes/user')
const employeeRoutes=require('./api/routes/employee')
const bookingRoutes=require('./api/routes/booking')
const customerRoutes=require('./api/routes/customer')

// app.use((req, res, next)=>{
//     res.status(200).json({
//         msg:"This is simple get request"
//     });
// });

//use of morgan
app.use(morgan("dev"));

//use of mongoose (mongoose connection string)
mongoose.connect('mongodb+srv://uditachakraborty2000:'+process.env.MONGO_ATLAS_PW+'@cluster0.jhtxjc3.mongodb.net/')
  .then(() => {console.log('Connected Successfully with MongoDB Atlas!')});

//use of body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//code to handle cors error
app.use((req, res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Width,Content-Type,Accept,Authorization")
    res.header("Access-Control-Allow-Credentials",true)
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
    if(res.header==="OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
        return res.status(200).json()
    }
    next();
})

app.use("/products",productRoutes);
app.use("/orders",orderRoutes);
app.use("/user",userRoutes);
app.use("/employee",employeeRoutes);
app.use("/booking",bookingRoutes);
app.use("/customer",customerRoutes);


//handle error by using middleware
app.use((req,res,next)=>{
    const error = new Error("Route Not Found");
    next(error);
});
app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        error:error.message
    })
})

module.exports=app;