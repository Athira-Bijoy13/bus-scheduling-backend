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





router.post('/student-login',async(req,res)=>{
    try {
        console.log(req.body);
       const student=await Student.findByCredentials(
        req.body.userName,
        req.body.password
       );
       console.log(req.body);
        if(student.isVerified!=true){
            throw new Error('student not verified')
        }
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