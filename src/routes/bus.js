const express=require('express')
const Stop = require('../models/stop')
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

