const express=require('express');
const router = express.Router();

const empModelRequest=require('../controller/employee.model');

//get emp list
router.get("/",empModelRequest.get_emp);
//add emp
router.post("/", empModelRequest.add_emp);
//get single emp
router.get("/:empId", empModelRequest.get_emp_ById);
//put single emp
router.put("/:empId", empModelRequest.update_emp_ById);
//delete single emp
router.delete("/:empId", empModelRequest.delete_emp_ById);

module.exports=router;