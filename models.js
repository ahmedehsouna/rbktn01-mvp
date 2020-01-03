var mongoose = require("mongoose")


var User = mongoose.model("user" , mongoose.Schema({
    username : {
        unique: true,
        type: String
    },
    firstname : String,
    lastname : String,
    password : String,
    language : String,
    circle   : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "circle"        
    }
}))

var Circle = mongoose.model("circle" , mongoose.Schema({
    name : Number,
    users : [{
        type : mongoose.Schema.Types.ObjectId,
        ref  : "user"
    }]
}))

var Message = mongoose.model('message', mongoose.Schema({
    content : String,
    circle  : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "circle"
    },
    user  : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "user" 
    }  
}))


module.exports = {User, Message, Circle}