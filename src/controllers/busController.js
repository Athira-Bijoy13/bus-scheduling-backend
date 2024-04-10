const BusRoute = require("../models/busroute")
const Driver = require("../models/driver")
const Student = require("../models/student")

const updateDriverLocation=async()=>{
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

const getDriverLocation=async()=>{
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

module.exports={
    updateDriverLocation,
    getDriverLocation
}