const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const {ObjectId}=require('mongodb')

require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const jwt_sceret='agami'
const RegisterModel=require('./db/register')
const BookingModel=require('./db/book')
const StaffModel=require('./db/staff')

mongoose.connect(process.env.MongoDB_URL).then(()=>{
    console.log("MongoDB connected ")
}).catch((error)=>{
    console.log(`Error in connecting to MongoDB: ${error}`)
})

app.post('/register',async(req,res)=>{
    const {name,email,password,role}=req.body
    const hashedPassword=await bcrypt.hash(password,10)
    try {       
        const user=new RegisterModel({
            name:name,
            email:email,
            password:hashedPassword,
            role:role
        })
        const response=await user.save()
        console.log(response)
        jwt.sign({userId:response._id,name,email},jwt_sceret,{},async(err,token)=>{
            if(err){
                throw err
            }else{
                res.cookie('token',token).json(token)
                console.log(token)
            }
        })
    } catch (error) {
        console.log("Error registering",error)
    }
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try {
        const userDocs=await RegisterModel.findOne({email})
        if(userDocs){
            const passwordOk=bcrypt.compareSync(password,userDocs.password)
            if(passwordOk){
                res.status(200).json(userDocs.role)
            }else{
                res.status(401).json("Invalid Password")
            }
        }else{
            res.status(401).json("User not found")
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/userBookings',async(req,res)=>{
    try {
        const response=await BookingModel.find()
        if(!response){
            res.status(404).json("Failed")
        }else{
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/accounts',async(req,res)=>{
    try {
        const response=await RegisterModel.find()
        if(!response){
            res.status(404).json("Failed")
        }else{
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
    }
})

app.post('/addStaff',async(req,res)=>{
    const {name,day,from,till}=req.body
    const newFrom=new Date(from)
    console.log(`${day}${from}:${till}0Z`)
    try {
        const newStaff=new StaffModel({
            name:name,
            day:day,
            startTime:from,
            endTime:till
        })
        const response=await newStaff.save()
        if(response){
            res.status(200).json("Staff created successfully")
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/getStaff',async(req,res)=>{
    try {
        const response=await StaffModel.find()
        if(response){
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/getStaff/:id',async(req,res)=>{
    const id=req.params.id
    try {
        const response=await StaffModel.findById(id)
        if(response){
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
    }
})

app.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    try {
        const response=await StaffModel.findByIdAndDelete(id)
        if(response){
            res.status(201).json("deleted")
        }
    } catch (error) {
        
    }
})

app.put('/update/:id',async(req,res)=>{
    const id=req.params.id
    const {name,day,from,till}=req.body
    try {
        const newStaff=await StaffModel.findByIdAndUpdate(id)
        console.log(newStaff)
        newStaff.set({
            name:name,
            day:day,
            startTime:from,
            endTime:till
        })
        const response=await newStaff.save()
        if(response){
            res.status(201).json(response)
        }
    } catch (error) {
        console.log(error)
    }
})

app.post('/booking',async(req,res)=>{
    const {token}=req.cookies
    const {task,from,till,day}=req.body
    console.log(day)
    try {
        const availableStaff=await StaffModel.find({
            day:{$eq:day}
        })
        res.json(availableStaff)
    } catch (error) {
        console.log(error)
    }
})

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(4000,()=>{
    console.log("Connected to the server at 4000")
})