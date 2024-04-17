const express=require("express");
// const { getAllStops } = require("../controllers/busController");

const router=express.Router();
const buscontroller = require("../controllers/busController");

router.get('/get-all-stops',buscontroller.getAllStops);


module.exports=router