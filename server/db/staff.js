const mongoose=require('mongoose')

const StaffSchema=mongoose.Schema({
    name:{type:String,required:true},
    day:{type:String},      
    startTime:{type:String},
    endTime:{type:String}
})

const StaffModel=mongoose.model('staff',StaffSchema)

module.exports=StaffModel