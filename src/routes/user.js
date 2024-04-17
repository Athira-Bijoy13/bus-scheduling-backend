const express=require("express");
const usercontroller = require("../controllers/userController");
const auth = require("../middleware/authentication");
const router=express.Router();

router.post("/create-admin",usercontroller.createAdmin);

router.post("/create-student",usercontroller.createStudent);

router.post("/create-driver",usercontroller.createDriver);

router.post("/signin",usercontroller.userSignin);

router.get("/get-all-users",auth,usercontroller.getusers);

router.get("/get-student-by-id/:id",auth,usercontroller.getStudentByID);

router.get("/get-driver-by-id/:id",auth,usercontroller.getDriverByID);

router.get("/me",auth,usercontroller.getUser);

module.exports=router