
var express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    server        = express(),
    port          = process.env.PORT || 3000
server.use(express.static("public"))
      .listen(port)