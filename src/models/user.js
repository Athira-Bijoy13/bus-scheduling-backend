const mongoose=require("mongoose")
const jwt=require("jsonwebtoken");
const bcrypt=require('bcryptjs')

const user_Schema=new mongoose.Schema(
    {
        name:{
            type:String
        },
        userID:{
            type:String,
            unique:true,
     
        },
        email:{
            type:String
        },
        user_type:{
            type:String,
            enum:['student','driver','admin'],
            required:true
        },
        password:{
            type:String,
          
        },
        tokens:[
            {
                token:{type:String}
            }
        ]


    },
    {
        timestamps:true
    }
)

user_Schema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

user_Schema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

user_Schema.methods.generateAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},'schedule')
    user.tokens.push({token});
    await user.save();
    return token;
}

user_Schema.statics.findByCredentials=async(userID,password)=>{
    const user=await User.findOne({userID})
    if(!user){
        throw new Error("Unable to login")
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user;
}

const User=mongoose.model('users',user_Schema);
module.exports=User