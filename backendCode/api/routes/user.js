const express=require('express');
const router = express.Router();

const userModelRequest=require('../controller/user.model');

//get user list
router.get("/",userModelRequest.get_user);
//add user
router.post("/", userModelRequest.add_user);
//get single user
router.get("/:userId", userModelRequest.get_user_ById);
//put single user
router.put("/:userId", userModelRequest.update_user_ById);
//delete single user
router.delete("/:userId", userModelRequest.delete_user_ById);

module.exports=router;


