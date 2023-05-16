const express=require('express')
const Student = require('../models/student')
const router=express.Router()

router.post('/create-student',async(req,res)=>{
    const student= new Student()
    
})