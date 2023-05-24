const mongoose=require("mongoose")

const admin_Schema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true

        },
        phone:{
            type:String,
            required:true
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

admin_Schema.pre('save',async function(next){
    const admin=this
    if(admin.isModified('password')){
        admin.password=await bcrypt.hash(admin.password,8)
    }
    next()
})

admin_Schema.methods.toJSON=function(){
    const admin=this;
    const adminObject=admin.toObject();
    delete adminObject.password;
    delete adminObject.tokens;
    return adminObject;
}

admin_Schema.methods.generateAuthToken=async function(){
    const admin=this;
    const token=jwt.sign({_id:admin.id.toString()},'schedule')
    admin.tokens=admin.tokens.concat({token});
    await admin.save();
    return token;
}

admin_Schema.statics.findByCredentials=async(email,password)=>{
    const admin=await admin.findOne({email})
    if(!admin){
        throw new Error("Unable to login")
    }
    const isMatch=await bcrypt.compare(password,admin.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return admin;
}
const Admin=mongoose.model("admin",admin_Schema);
module.exports=Admin;