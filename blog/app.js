var express = require("express")
var app = express()
var post = require("./routes/post")
var morgan = require("morgan")
var bodyParser = require("body-parser");
var methodOverride = require("method-override")
var session = require('express-session')
var cookieParser = require('cookie-parser')
var csrf = require('csurf')

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(csrf())

app.use(function(req, res, next) {
	res.locals.csrftoken = req.csrfToken()
	next();
})


app.get("/", post.index)
app.get("/posts/new", post.new)
app.post("/posts/create", post.create)
app.get("/posts/:id([0-9]+)", post.show)
app.get("/posts/:id/edit", post.edit)
app.put("/posts/:id", post.update)
app.delete("/posts/:id", post.destroy)

app.use(function(err, req, res, next){
	res.send(err.message);
})


app.listen(8080)
console.log("server starting")
