const express=require('express')
const Student = require('../models/student')
const auth = require('../middleware/authentication')
const router=express.Router()
const multer=require('multer')
const Stop = require('../models/stop')
const Bus = require('../models/bus')
const upload = multer({
    limit: {
      fileSize: 1000000,
    },
    fileFilter(req, file, callback) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|heic)$/))
        return callback(new Error("File must be an Image!"));
      callback(undefined, true);
    },
  });
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

router.post('/update-student',auth,async(req,res)=>{
    try {
        const updates=Object.keys(req.body);
        const student= req.student

        updates.forEach((update)=>{
            student[update]=req.body[update];
        })
        await student.save()
        res.status(200).send({
            status:"ok",
            msg:"Student updated",
            data:student
        })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
    

})

router.get("/signout/:token",auth,async(req,res)=>{
    const token=req.params.token
    try {
      const Student=req.student;
      console.log(token);
      Student.tokens=Student.tokens.filter((Studenttokens)=>{
        return Studenttokens.token!=token;
      })
      console.log(Student.tokens);
      await Student.save();
      res.status(200).send({
        status: "ok",
        msg: "Student signed out",
        data: Student,
      });
    
    } catch (e) {
      res.status(400).send({
        status: "failed",
        msg: e.message,
      });
    }
    
  })
  





router.post('/student-login',async(req,res)=>{
    try {
       
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
        const stop=await Stop.findById(req.student.busStopID)
        if(!stop)
            throw new Error("no stop")
        res.status(200).send({
            status:"ok",
            msg:"got student",
            data:req.student,
            stop:stop
           })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})

router.get('/get-student-route',auth,async(req,res)=>{
    try {
        const stopId=req.student.busStopID;
       
        const buses=await Bus.find();
        let busroute
        if(!buses)
            throw new Error("No buses")
        buses.forEach((bus)=>{
            
            for(let i=1;i<bus.schedule.length;i++){
                console.log(bus.schedule[i].stopID);
                if(bus.schedule[i].stopID==stopId)
                {
                    busroute=bus
                    break;
                
            }
            }
            if(busroute)
                return;
             
         })
         if(!busroute)
            throw new Error("No bus route")
         res.status(200).send({
            status:"ok",
            msg:"got bus route",
            data:busroute
           })
        
        
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})



module.exports=router;