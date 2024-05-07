const { default: axios } = require("axios")
const Bus = require("../models/bus")
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
        const student=await Student.findOne({user_id:req.user._id})
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
    
            const allStops=await Stop.find()
    
            let matrix=[]
            let DistMatrix=[]
            no_of_students=[]
            total_students=0
            for(let i = 0;i<allStops.length;++i ){
                stopslength=allStops[i].distanceArray.length;
                no_of_students.push(allStops[i].numOfStudents)
                total_students=total_students+allStops[i].numOfStudents
                matrix[i]=[]
                for(let j=0;j<=i;j++){
                    matrix[i][j]=allStops[i].distanceArray[j].distance;
                    matrix[j][i]=matrix[i][j];
                }
                DistMatrix.push(matrix[i])
            }
            
            let buses=await Bus.find();
            bus_capacity=25
            if(total_students/bus_capacity>buses.length)
                throw new Error("Not enough buses available to accomodate all students")
            
           no_buses=Math.ceil(total_students/bus_capacity)
           num_locations=allStops.length;
          
         
           console.log(DistMatrix,no_of_students)
           console.log(num_locations,bus_capacity,no_buses,total_students)
           const result=await axios.post(`http://127.0.0.1:5000/generate-busroute`,{
            data:DistMatrix,
            num_locations,
            no_buses,
            no_of_students,
            bus_capacity

        })
           console.log(result.data);
           bus_route=result.data.data.route;
           total_distance=result.data.data.min_distance
           promises=[]
           const delete_busroute=await BusRoute.deleteMany()
           bus_capacities=result.data.bus_capacities;
           await Promise.all(bus_route.map(async(route,i)=>{
            busRoute=new BusRoute();
            array=[]
            route.map((stop,ind)=>{
                stop_id=allStops[stop]._id
                busRoute.stops.push(stop_id)
            })
            // console.log(route);
            promises.push(busRoute.save())
            
           }))

           await Promise.all(promises)
         
            const b=await BusRoute.find()
            res.status(200).send({
                status:"ok",
                msg:"route",
                r:result.status,
                distance:total_distance,
                b
               
                
                
              
            })
      
    } catch (e) {
        console.log(e)
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
}

module.exports={
    updateDriverLocation,
    getDriverLocation,
    createBusRoutes,
    getAllStops,
    generateBusRoutes,
}