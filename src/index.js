const express=require('express')
const cors = require('cors')

require('./database/mongoose')
// const StudentRoute=require('./routes/student')
// const AdminRoute=require('./routes/admin')
// const BusRoute=require('./routes/bus')
const UserRoute=require('./routes/user')
const app=express();
const port=8001;
app.use(cors())
app.use(express.json())
app.use("/user",UserRoute)
// app.use(StudentRoute)
// app.use(AdminRoute)
// app.use(BusRoute)

app.get('/test',(req,res)=>{
    console.log("hi")
    res.send("hello")

})
app.listen(port,async()=>{
    console.log("Running on port "+port);
    
})