const mongoose = require('mongoose')

const visitorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            trim: true
        },

        phone: {
            type: String,
            required: true
        },

        company: {
            type: String,
            trim: true
        },

        photo: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Visitor', visitorSchema)