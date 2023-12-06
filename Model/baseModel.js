const mongoose = require('mongoose')

const model = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    phone:{
        type:Number
    },
    location:{
        type:String
    }
})

module.exports = mongoose.model('userModel',model)