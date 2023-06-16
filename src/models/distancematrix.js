const mongoose=require("mongoose")

const distMatrix_Schema=new mongoose.Schema(
    {
        size:{
            type:Number
        },
        matrix:[[
            {
                from_stopID:{
                    type:String,
                },
                to_stopID:{
                    type:String,
                },
                distance:{
                    type:Number,
                }
            }
        ]]
    }
)