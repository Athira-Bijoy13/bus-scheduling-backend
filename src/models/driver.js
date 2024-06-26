const mongoose=require("mongoose")

const driver_schema=new mongoose.Schema(
    {
        user_id:{
            ref:"User",
            type:mongoose.Schema.Types.ObjectId
        },
        phone:{
            type:String
        },
        location:{
            latitude:{
                type:String
            },
            longitude:{
                type:String
            }
        }

    },
    {
        timestamps:true
    }
)


const Driver=mongoose.model("drivers",driver_schema);
module.exports=Driver;