const express=require('express')
const auth = require('../middleware/authentication')
const Admin = require('../models/admin')
const { route } = require('./student')
const Adminauth = require('../middleware/adminauth')
const Stop = require('../models/stop')
const router=express.Router()
var geoDistance = require('geo-distance');
const Student = require('../models/student')
const axios=require('axios');
const DistMatrix = require('../models/distancematrix')
const Bus = require('../models/bus')
const url=`http://127.0.0.1:5000/comb`
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
  
    return Math.round(distance*1000);  // in kilometers
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
router.get('/student/:id',Adminauth,async(req,res)=>{

    try {
        const student=await Student.findById(req.params.id);
        if(!student)
            throw new Error("No student found")
        res.status(200).send({
            status:"ok",
            msg:"got student",
            data:student
           })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})

router.get('/get-all-students',Adminauth,async(req,res)=>{
    try {
        const Students=await Student.find();
        if(!Students)   
            throw new Error('No students')
        res.status(200).send({
            status:"ok",
            msg:"Got data",
            data:Students
        }) 
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})

router.post("/create-busstop",auth,async(req,res)=>{
 
})


router.get('/route',async(req,res)=>{

    try {
        const allStops=await Stop.find()

        let matrix=[]
        let DistMatrix=[]
      
        for(let i = 0;i<allStops.length;++i ){
            stopslength=allStops[i].distanceArray.length;
            matrix[i]=[]
            for(let j=0;j<=i;j++){
                matrix[i][j]=allStops[i].distanceArray[j].distance;
                matrix[j][i]=matrix[i][j];
            }
            DistMatrix.push(matrix[i])
        }
        
        let buses=await Bus.find();
        noOfBus=buses.length
       
        
      
        
        res.status(200).send({
            status:"ok",
            msg:"route",
            
            bus_routes:buses
        })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }

   
})

router.get('/verify-student/:id',Adminauth,async(req, res)=>{
    try {
        const id=req.params.id
        const student=await Student.findById(id);
        if(!student){
            throw new Error('No student found')
        }
        student.isVerified=true
        await student.save()
        res.status(200).send({
            status:"ok",
            msg:"verified student",
            data:student
           })


    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})

module.exports=router;