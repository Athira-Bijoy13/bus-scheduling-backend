const express=require("express");
const usercontroller = require("../controllers/userController");
const auth = require("../middleware/authentication");
const router=express.Router();


router.post("/create-admin",usercontroller.createAdmin);

router.post("/create-student",usercontroller.createStudent);

router.post("/create-driver",usercontroller.createDriver);

router.post("/signin",usercontroller.userSignin);

router.get("/me",auth,usercontroller.getUser);

module.exports=router