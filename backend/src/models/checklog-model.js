// passId
// checkInTime
// checkOutTime

const mongoose = require('mongoose');

const checklogSchema = new mongoose.Schema(
    {
        passId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Pass',
            required:true
        },
        checkInTime:{
            type:Date,
            required:true
        },
        checkOutTime:{
            type:Date
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Checklog",checklogSchema);