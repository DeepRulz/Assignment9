// appointmentId
// qrData
// issuedBy
// validTill
const mongoose = require("mongoose");

const passSchema = new mongoose.Schema(
    {
        appointmentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required:true
        },
        qrData:{
            type:String,
            required:true,
            trim:true
        },
        qrImage:{
            type:String,
        },
        issuedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        validTill:{
            type:Date,
            required:true,
        }
    },
{
        timestamps: true
    }
)

module.exports=mongoose.model("Pass", passSchema);