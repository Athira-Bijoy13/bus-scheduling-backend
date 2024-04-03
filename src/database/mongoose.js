const mongoose=require('mongoose')
const url=`mongodb+srv://athirabijoy:miniproject@cluster0.psdfiuq.mongodb.net/`


const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(url,connectionParams)
    .then(()=>{
        console.log("Connected to the Database");
    })
    .catch((error)=>{
        console.error(`Error connecting to the database. ${error}`);
    })