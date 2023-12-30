const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required: true
    },
    lastname : {
        type : String,
        required: true
    },
    sex : {
        type : String,
        required: true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

module.exports = new mongoose.model("Profile", profileSchema)