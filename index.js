const express=require('express')
const cors = require('cors')

require('./src/database/mongoose')
// const StudentRoute=require('./routes/student')
// const AdminRoute=require('./routes/admin')
// const BusRoute=require('./routes/bus')
const UserRoute=require('./src/routes/user');
const Busroute = require('./src/routes/bus_route');
const app=express();
const port=process.env.PORT||8000
app.use(cors())
app.use(express.json())
app.use("/api/user",UserRoute)
app.use("/api/busroute",Busroute)
// app.use(StudentRoute)
// app.use(AdminRoute)
// app.use(BusRoute)

app.get('/test',(req,res)=>{
    console.log("hi")
    res.send("helllllooo")

})
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(port,async()=>{
    console.log("Running on port "+port);
    
})