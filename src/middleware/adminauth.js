const jwt=require('jsonwebtoken')
const Admin = require('../models/admin')

const Adminauth=async(req,res,next)=>{
    try {
        const token=req.header("Authorization").replace('Bearer ','')
        const decoded=await jwt.verify(token,'schedule')
        const admin=await Admin.findOne({_id:decoded._id,'tokens.token':token})

        if(!admin){
            throw new Error()
        }
        req.token=token
        req.admin=admin
        next()


    } catch (e) {
        res.status(404).send({
            status:"failed",
            msg:"Please authenticate",
        error:e.message
    })
    }
}

module.exports=Adminauth