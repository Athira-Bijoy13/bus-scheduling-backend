const mongoose=require("mongoose")

const stop_Schema=new mongoose.Schema(
    {
        stop_name:{
            type:String,
            required:true,
            trim:true
        },
        distanceArray:[
            {
                stopid:{
                    type:String,
                },
                distance:{
                    type:Number
                }
            }
        ],
        location:{
            latitude:{
                type:String
            },
            longitude:{
                type:String
            }
        },
        numOfStudents:{
            type:Number,
        },
      
    },
    {
        timestamps:true
    }
)

const Stop=mongoose.model('BusStops',stop_Schema)
module.exports=Stop;