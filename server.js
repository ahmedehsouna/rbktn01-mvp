
var express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    server        = express(),
    port          = process.env.PORT || 3000
    mongoose.connect('mongodb://see7een:see7een@ds111279.mlab.com:11279/talking-circles', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  mongoose.connection.once("open" , _=> console.log("workin"))




server.use(express.static("public"))
      

server.get("/data" , (req, res)=>{

      })




server.listen(port)