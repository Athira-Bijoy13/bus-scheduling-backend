const mongoose=require("mongoose")

const busroute_Schema=new mongoose.Schema(
    {
        stops:[
            {
                stop_id:{
                    ref:"Stop",
                    type:mongoose.Schema.Types.ObjectId
                }
            }
            
        ],
        driver:{
            
                ref:"Driver",
                type:mongoose.Schema.Types.ObjectId
            
        }
    }
)


const BusRoute=mongoose.model('BusRoutes',busroute_Schema)
module.exports=BusRoute;