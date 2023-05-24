const express=require('express')
const auth = require('../middleware/authentication')
const Admin = require('../models/admin')
const router=express.Router()

route.post('/create-admin',async(req,res)=>{
    try {
        const admin=new Admin(req.body)
        await admin.save()
        res.status(200).send({
            status:"ok",
            msg:"admin created",
            data:admin
        })        
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
})


router.post('/admin-login',async(req,res)=>{
    try {
        const admin=await Admin.findByCredentials(
         req.body.email,
         req.body.password
        );
 
        const token=await admin.generateAuthToken();
        res.status(200).send({
         status:"ok",
         msg:"Login success",
         data:admin,
         token:token
        })
     } catch (e) {
         res.status(400).send({
             status:'failed',
             msg: e.message,
         })
     }
})