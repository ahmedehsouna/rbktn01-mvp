
var express       = require("express"),
    bodyParser    = require("body-parser"),
    cookieParser  = require("cookie-parser"),
    ObjectId      = require("mongodb").ObjectID,
    {User, Circle, Message}        = require('./models.js'),
    mongoose      = require("mongoose"),
    socket        = require("socket.io"),
    app           = express(),
    bcrypt        = require('bcrypt'),
    port          = process.env.PORT || 3000
    mongoose.connect('mongodb://see7een:see7een@ds111279.mlab.com:11279/talking-circles', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  mongoose.connection.once("open" , _=> console.log("workin"))




app.use(express.static("public"))
      .use(bodyParser.json())
      .use(cookieParser())
      

app.post("/login" , (req, res)=>{
    User.findOne({username : req.body.username}).populate("circle").exec((err , found) => {
        if (err) res.json({success : false,err})
        else {
            if(!found) res.json({success : false, msg : "user does't exist"})
            else{
                bcrypt.compare(req.body.password , found.password , (err,match)=>{
                    if (err) res.json({success : false, err})
                    else if(!match) res.json({success: false,msg:"password is incorrect"})
                    else{
                        res.cookie("user" , `${found.username}`)
                        delete found.password
                        res.json({success : true, user : found})

                    }
                })
            } 
        }
    })

      })
      app.get("/logout" , (req, res)=>{
        console.log(req.body)
        res.clearCookie("user")
        res.json({success : true})

      })
app.post("/signup" , (req, res)=>{
    Circle.findOne( {$nor : [{'users.9' : {$exists : true}}]} , (err,circle) => {
        if(circle){
            req.body.circle = circle._id
            userCreation()

        } else{
            Circle.count({} , (err , number) => {
                Circle.create({name : number} , (err , created) => {
                    req.body.circle = created._id
                    userCreation()
                })

            })
        }
    })
    function userCreation(){
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            req.body.password = hash
            User.create(req.body, (err,created)=>{
                if(err) throw err
                else{
                    Circle.findByIdAndUpdate(created.circle, {$push : {users : ObjectId(created._id) }} , (err,found) => {
                User.findById(created._id).populate("circle").exec((err,found) => {
                    res.cookie("user" , `${created.username}`)
                    delete found.password
                    res.json({success : true, user : found })

                })
                    })
                } 
    
            })
        });

    }
    })

app.post("/messages" , (req,res) => {
    Message.create(req.body, (err,created) => {
        if (err) throw err
        else {
    Message.findById(created._id).populate("user").exec((err,found)=>{
        res.json(found)

    })
        }
    })
    
})

app.get("/messages" , (req,res) => {
    console.log(req.query)
    Message.find(req.query).populate("user").exec((err,messages) => {
        if (err) throw err
        else {
            res.json(messages)
        }
    })
    
})
app.get("/user" , (req,res) => {
    User.findOne({username : req.cookies.user}).populate("circle").exec((err,found) => {
        if (err) throw err
        else {
            res.json(found)
        }
    })

    
})




var server = app.listen(port)

var io = socket(server)
io.on("connection" ,  connect=>{
    connect.on("message" , data => {
        io.sockets.emit("message" , data)
    })
})