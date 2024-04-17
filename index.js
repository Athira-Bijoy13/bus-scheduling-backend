const express=require('express')
const cors = require('cors')

require('./src/database/mongoose')
// const StudentRoute=require('./routes/student')
// const AdminRoute=require('./routes/admin')
// const BusRoute=require('./routes/bus')
const UserRoute=require('./src/routes/user');
const Busroute = require('./src/routes/busRoute');
const buscontroller = require('./src/controllers/busController');
const Stop = require('./src/models/stop');
const app=express();
const port=process.env.PORT||8000
app.use(cors())
app.use(express.json())
app.use("/api/user",UserRoute)
app.use("/api/busroute",Busroute)
// app.use(StudentRoute)
// app.use(AdminRoute)
// app.use(BusRoute)

app.get('/api/get-all-stops',buscontroller.getAllStops);
app.get('/test',async(req,res)=>{
    const stops=await Stop.find()
    if(!stops)
        throw new Error("No bus stops")
    
    res.status(200).send({
        status:"ok",
        msg:"got all stops",
        data:stops
    })

})
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(port,async()=>{
    console.log("Running on port "+port);
    
})