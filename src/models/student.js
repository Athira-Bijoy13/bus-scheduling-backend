const mongoose=require("mongoose")
const jwt=require("jsonwebtoken");
const bcrypt=require('bcryptjs')

const student_Schema=new mongoose.Schema(
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
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            trim:true
        },
        isVerified:{
            type:Boolean,
            default:false,
            trim:true
        },
        // phone:{
        //     type:String,
        //     trim:true
        // },
        // address:{
        //     type:String,
        //     required:true,
        //     trim:true
        // },
        // busStop:{
        //     type:String,
        //     required:true,
        //     trim:true
        // },
        tokens: [
            {
              token: { type: String, required: true },
            },
          ],
    },
    {
        timestamps:true
    }

)


student_Schema.pre('save',async function(next){
    const student=this
    if(student.isModified('password')){
        student.password=await bcrypt.hash(student.password,8)
    }
    next()
})

student_Schema.methods.toJSON=function(){
    const student=this;
    const studentObject=student.toObject();
    delete studentObject.password;
    delete studentObject.tokens;
    return studentObject;
}

student_Schema.methods.generateAuthToken=async function(){
    const student=this;
    const token=jwt.sign({_id:student.id.toString()},'schedule')
    student.tokens=student.tokens.concat({token});
    await student.save();
    return token;
}

student_Schema.statics.findByCredentials=async(email,password)=>{
    const student=await Student.findOne({email})
    if(!student){
        throw new Error("Unable to login")
    }
    const isMatch=await bcrypt.compare(password,student.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return student;
}
const Student=mongoose.model("Student",student_Schema);
module.exports=Student;