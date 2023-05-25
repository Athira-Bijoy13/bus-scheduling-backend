const express=require('express')
const auth = require('../middleware/authentication')
const Admin = require('../models/admin')
const { route } = require('./student')
const Adminauth = require('../middleware/adminauth')
const Stop = require('../models/stop')
const router=express.Router()
var geoDistance = require('geo-distance');


function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers
  
    // Convert latitude and longitude to radians
    const latRad1 = (lat1 * Math.PI) / 180;
    const lonRad1 = (lon1 * Math.PI) / 180;
    const latRad2 = (lat2 * Math.PI) / 180;
    const lonRad2 = (lon2 * Math.PI) / 180;
  
    // Calculate the differences between the coordinates
    const latDiff = latRad2 - latRad1;
    const lonDiff = lonRad2 - lonRad1;
  
    // Apply the Haversine formula
    const a =
      Math.sin(latDiff / 2) ** 2 +
      Math.cos(latRad1) * Math.cos(latRad2) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
  
    return distance;  // in kilometers
  }
  
 

  
router.post('/create-admin',async(req,res)=>{
    try {
        const admin=new Admin(req.body)
        await admin.save()
        res.status(200).send({
            status:"ok",
            msg:"admin created",
            data:admin
        })        
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})


router.post('/admin-login',async(req,res)=>{
    try {
        const admin=await Admin.findByCredentials(
         req.body.email,
         req.body.password
        );
 
        const token=await admin.generateAuthToken();
        res.status(200).send({
         status:"ok",
         msg:"Login success",
         data:admin,
         token:token
        })
     } catch (e) {
         res.status(400).send({
             status:'failed',
             msg: e.message,
         })
     }
})

router.post('/create-busstop',Adminauth,async(req,res)=>{
    try {

        const busStop=new Stop();
        busStop.stop_name=req.body.stop_name;
        busStop.numOfStudents=req.body.numOfStudents;
        busStop.location.latitude=req.body.latitude;
        busStop.location.longitude=req.body.longitude;
        const distance = calculateDistance(busStop.location.latitude, busStop.location.longitude, 9.957934290145328, 76.33811778186022)
        console.log(distance);//([9.96263082496751, 76.33039506594679], 9.957934290145328, 76.33811778186022)

        await busStop.save()
        res.status(200).send({
            status:"ok",
            msg:"created bus stop",
            dist:distance,
            data:busStop
           })
        
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})


module.exports=router;