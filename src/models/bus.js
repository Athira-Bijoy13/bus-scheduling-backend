const mongoose=require("mongoose")

const bus_Schema=new mongoose.Schema(
    {
        bus_no:{
            type:String,
            required:true,
            unique:true
        },
        capacity:{
            type:Number,
            required:true

        },
       
    },
    {
        timestamps:true
    }
)


const Bus=mongoose.model("Bus",bus_Schema);
module.exports=Bus;