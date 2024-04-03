const Admin = require("../models/admin");
const Driver = require("../models/driver");
const Student = require("../models/student");
const User = require("../models/user");

const createAdmin=async(req,res)=>{
    try {
        const user=new User();
        user.name=req.body.name;
        user.email=req.body.email;
        user.password=req.body.password;
        const id=user.id.substring(20);
        user.userID='AD'+ id;
        user.user_type='admin';
        await user.save();

        const admin=new Admin(req.body);
        admin.user_id=user._id;
        await admin.save();
        res.status(200).send({
            status:"ok",
            msg:"created admin",
            data:{
                user,
                admin
            }
        })

    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
}


const createStudent=async(req,res)=>{
    try {
        console.log(req.body);
        const user=new User(req.body);
        user.userID=req.body.admn_no;
        user.user_type='student';
        await user.save();

        const student=new Student(req.body);
        student.user_id=user._id;
        await student.save();
        res.status(200).send({
            status:"ok",
            msg:"created student",
            data:{
                user,
                student
            }
        })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
}

const createDriver=async(req,res)=>{
    try {
        const user=new User(req.body);
        const id=user.id.substring(20);
        user.userID='D'+ id;
        user.user_type='driver';
        await user.save();

        const driver=new Driver(req.body);
        driver.user_id=user._id;
        await driver.save();
        res.status(200).send({
            status:"ok",
            msg:"created driver",
            data:{
                user,
                driver
            }
        })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
}



const userSignin=async(req,res)=>{
    try {
        const user=await User.findByCredentials(req.body.userID,req.body.password);
        const token=await user.generateAuthToken();

      console.log(token);
        res.status(200).send({
            status:"ok",
            msg:"user signed in",
            data:{
                user,
                token
            }
        })
        
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }
}


const getUser=async(req,res)=>{
    try {
        const user=req.user;
        let data;
        switch(user.user_type){
            case 'student':data=await Student({user_id:user._id})
            break;
            case 'driver':data=await  Driver({user_id:user._id})
            break;
            case 'admin':data=await Admin({user_id:user._id})
        }
        res.status(200).send({
            status:"ok",
            msg:"got user details",
            data:{
                user,
                data
            }
        })
    } catch (e) {
        res.status(400).send({
            status:'failed',
            msg: e.message,
        })
    }

}

module.exports={
    createAdmin,
    createStudent,
    createDriver,
    userSignin,
    getUser,
}