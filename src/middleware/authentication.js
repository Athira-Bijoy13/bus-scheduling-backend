const jwt=require('jsonwebtoken')
const Student = require('../models/student')
const User = require('../models/user')

const auth=async(req,res,next)=>{
    try {
        const token=req.header("Authorization").replace('Bearer ','')
        const decoded=await jwt.verify(token,'schedule')
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.token=token
        req.user=user
        next()


    } catch (e) {
        res.status(404).send({
            status:"failed",
            msg:"Please authenticate",
        error:e.message})
    }
}

module.exports=auth