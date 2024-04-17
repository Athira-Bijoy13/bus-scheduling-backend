const express=require('express')
const Stop = require('../models/stop')
const Bus = require('../models/bus')

const auth = require('../middleware/authentication')
const router=express.Router()


router.get('/get-all-stops',async(req,res)=>{
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
})

router.get('/get-stop/:id',async(req,res)=>{
    try {
        const stop=await Stop.findById(req.params.id)
       console.log(stop);
        if(!stop)
            throw new Error("No bus stop")
        
        res.status(200).send({
            status:"ok",
            msg:"got  stop",
            data:stop
        })
        

    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})


router.post('/create-bus',auth ,async(req,res)=>{
    try {
        
        const bus=new Bus(req.body)
        await bus.save()
        res.status(200).send({
            status:"ok",
            msg:"created bus",
            data:bus
        })

    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
        
    }
})


router.get('/get-all-buses',async(req,res)=>{
    try {
       
        const buses=await Bus.find()
       
        res.status(200).send({
            status:"ok",
            msg:"got data",
            data:buses,
           
        })
        

    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})
module.exports=router