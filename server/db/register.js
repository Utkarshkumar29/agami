const mongoose=require('mongoose')

const RegisterSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}
})

const RegisterModel=mongoose.model('register',RegisterSchema)

module.exports=RegisterModel