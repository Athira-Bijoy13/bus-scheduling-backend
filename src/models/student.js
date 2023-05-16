const mongoose=require("mongoose")
const validator=require("validator")
const jwt=require("jsonwebtoken");

const user_Schema=new mongoose.Schema(
    {
        admn_no:{
            type:String,
            required:true,
            trim:true
        },
        studentName:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            trim:true
        },
        phone:{
            type:String,
            trim:true
        },
        address:{
            type:String,
            required:true,
            trim:true
        },
        busStop:{
            type:String,
            required:true,
            trim:true
        },
        tokens: [
            {
              token: { type: String, required: true },
            },
          ],
    }

)

const Student=mongoose.model("Student",student_Schema);
module.exports=Student;