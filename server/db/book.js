const mongoose=require('mongoose')

const BookingSchema=mongoose.Schema({
    bookedBy:{type:String,required:true},
    task:{type:String,required:true},
    from:{type:Date,required:true},
    till:{type:Date,required:true},
})

const BookingModel=mongoose.model('booking',BookingSchema)

module.exports=BookingModel