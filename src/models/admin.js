const mongoose=require("mongoose")

const admin_Schema=new mongoose.Schema(
    {
        user_id:{
            ref:"User",
            type:mongoose.Schema.Types.ObjectId
        },

        phone:{
            type:String,
            required:true
        },

        
    },
    {
        timestamps:true
    }
)


const Admin=mongoose.model("admin",admin_Schema);
module.exports=Admin;