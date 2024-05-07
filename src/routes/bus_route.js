const express=require("express");
const auth = require("../middleware/authentication");
const busController = require("../controllers/busController");
const router=express.Router();

router.post("/update-driver-location",auth,busController.updateDriverLocation)

router.get("/get-driver-location",auth,busController.getDriverLocation);

router.get("/get-bus-routes",busController.generateBusRoutes);

router.get("/get-all-stops",auth,busController.getAllStops);

module.exports=router