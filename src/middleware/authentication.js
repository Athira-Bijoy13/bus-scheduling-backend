const jwt=require('jsonwebtoken')
const Student = require('../models/student')

const auth=async(req,res,next)=>{
    try {
        const token=req.header("Authorization").replace('Bearer ','')
        const decoded=await jwt.verify(token,'schedule')
        const student=await Student.findOne({_id:decoded._id,'tokens.token':token})
        if(!student){
            throw new Error()
        }
        req.token=token
        req.student=student
        next()


    } catch (e) {
        res.status(404).send({
            status:"failed",
            msg:"Please authenticate",
        error:e.message})
    }
}

module.exports=auth