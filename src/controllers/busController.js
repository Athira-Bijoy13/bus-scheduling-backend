const BusRoute = require("../models/busroute")
const Driver = require("../models/driver")
const Stop = require("../models/stop")
const Student = require("../models/student")

const updateDriverLocation=async(req,res)=>{
    try {
        const user=req.user
        const driver=await Driver.findOneAndUpdate({user_id:user._id},{location:req.body.location})
        res.status(200).send({
            status:"ok",
                msg:"updated driver location",
                data:driver
        })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
}

const getDriverLocation=async(req,res)=>{
    try {
        const student=await Student.findOne({user_id:req.user})
        if(!student)
            throw new Error("No student found")
        const busroute=await BusRoute.findOne({stops:[student.busStopID]}).populate(['driver']).exec();
        res.status(200).send({
            status:"ok",
                msg:"got driver location",
                data:busroute.driver.location
        })

    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
}

const createBusRoutes=async(req,res)=>{
    try {

        const busStop=new Stop()
       busStop.stop_name=req.body.stop_name;
       busStop.numOfStudents=req.body.numOfStudents;
       busStop.location.latitude=req.body.latitude;
       busStop.location.longitude=req.body.longitude;
       let distance
       await busStop.save()
       const allStops=await Stop.find()
       console.log(allStops.length);
       allStops.map((stop,index)=>{
           distance = calculateDistance(busStop.location.latitude, busStop.location.longitude,stop.location.latitude,stop.location.longitude)
           busStop.distanceArray.push({stopid:stop._id,distance:distance})
       })
       await busStop.save()

       
       res.status(200).send({
           status:"ok",
           msg:"created bus stop",
           
           data:busStop
          })
       
   } catch (e) {
       res.status(400).send({
           status:'failed',
           msg: e.message,
       })
   }
}


const getAllStops=async(req,res)=>{
    try {
        const stops=await Stop.find()
        if(!stops)
            throw new Error("No bus stops")
        
        res.status(200).send({
            status:"ok",
            msg:"got all stops",
            data:stops
        })
        

    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
}

const generateBusRoutes=async(req,res)=>{
    try {
        console.log("hh")
        //     const allStops=await Stop.find()
    
        //     let matrix=[]
        //     let DistMatrix=[]
          
        //     for(let i = 0;i<allStops.length;++i ){
        //         stopslength=allStops[i].distanceArray.length;
        //         matrix[i]=[]
        //         for(let j=0;j<=i;j++){
        //             matrix[i][j]=allStops[i].distanceArray[j].distance;
        //             matrix[j][i]=matrix[i][j];
        //         }
        //         DistMatrix.push(matrix[i])
        //     }
            
        //     let buses=await Bus.find();
        //     noOfBus=buses.length
        //    console.log(DistMatrix)
            
          
            
            res.status(200).send({
                status:"ok",
                msg:"route",
                
              
            })
      
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
}

module.exports={
    updateDriverLocation,
    getDriverLocation,
    getAllStops,
    generateBusRoutes,
}