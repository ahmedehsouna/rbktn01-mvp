
var express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    server        = express()

server.use(express.static("public"))
      .listen(3000)