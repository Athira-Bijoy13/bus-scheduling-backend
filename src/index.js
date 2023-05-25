const express=require('express')
const cors = require('cors')

require('./database/mongoose')
const StudentRoute=require('./routes/student')
const AdminRoute=require('./routes/admin')

const app=express();
const port=8000;
app.use(cors())
app.use(express.json())
app.use(StudentRoute)
app.use(AdminRoute)


app.listen(port,async()=>{
    console.log("Running on port "+port);
    
})