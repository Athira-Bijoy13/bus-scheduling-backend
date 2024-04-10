const mongoose=require("mongoose")
const jwt=require("jsonwebtoken");
const bcrypt=require('bcryptjs')

const student_Schema=new mongoose.Schema(
    {
        user_id:{
            ref:"User",
            type:mongoose.Schema.Types.ObjectId
        },        
        phone:{
            type:String,
            trim:true
        },
        address:{
            type:String,
            trim:true
        },
        busStopID:{
          
                ref:"Stop",
                type:mongoose.Schema.Types.ObjectId
            
        },
       
    },
    {
        timestamps:true
    }

)



const Student=mongoose.model("Student",student_Schema);
module.exports=Student;