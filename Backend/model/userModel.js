const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : Number,
        default : 0,
    }
},{timestamps: true})


const userModel = mongoose.model('UserData', userSchema);
module.exports = userModel;