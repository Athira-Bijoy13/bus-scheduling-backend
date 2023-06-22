const mongoose=require("mongoose")

const distMatrix_Schema=new mongoose.Schema(
    {
        size:{
            type:Number,
            default:0
        },
        matrix:[[Number]]
    },
    {
        timestamps:true
    }
)

const DistMatrix=mongoose.model("Matrix",distMatrix_Schema)
module.exports=DistMatrix