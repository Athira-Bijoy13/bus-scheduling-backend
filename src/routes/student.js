const express=require('express')
const Student = require('../models/student')
const auth = require('../middleware/authentication')
const router=express.Router()

router.post('/create-student',async(req,res)=>{
    try {
        const student= new Student(req.body)
        await student.save()
        res.status(200).send({
            status:"ok",
            msg:"Student created",
            data:student
        })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
    

})


router.get('/get-all-students',async(req,res)=>{
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


router.get('/student-login',async(req,res)=>{
    try {
       const student=await Student.findByCredentials(
        req.body.email,
        req.body.password
       );

       const token=await student.generateAuthToken();
       res.status(200).send({
        status:"ok",
        msg:"Login success",
        data:student,
        token:token
       })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})

router.get('/student/me',auth,async(req,res)=>{
    try {
        res.status(200).send({
            status:"ok",
            msg:"got student",
            data:req.student
           })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})


module.exports=router;