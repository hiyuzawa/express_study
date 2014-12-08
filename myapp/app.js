var express = require("express")
var app = express()
//var router = express.Router()
var bodyParser = require('body-parser');
var morgan = require('morgan')
var json = require('json')

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(morgan("dev"))
app.use(function(req, res, next) {
	console.log("my custom middleware !!!!")
	next()
})
//app.use(json())
//app.use(express.urlencoded())
//app.use(express.bodyDecoder())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.param('user_id', function(req, res, next, id){
	console.log("id = "+id)
	var users = ["name-1", "name-2", "name-3", "name-4"]
	req.params.user = users[id]
	next()
})


app.get("/test", function(req, res){
	res.send("Hello World")
})
app.get("/", function(req, res){
	res.render("index", {title : "title"})
})
app.get("/users/:user_id([0-9]+)", function(req, res) {
	res.send("hello id " + req.params.user)
})
app.get("/users/:name?", function(req, res){
	if (req.params.name)
		res.send("Hello " + req.params.name)
	else
		res.send("Hello nobody")
})
app.get("/items/:id", function(req, res){
	res.send("item no: " + req.params.id)
})
app.get("/hello.txt", function(req, res){
	res.send("Hello from app.js")
	//res.sendFile(__dirname + "/public/hello.txt")
})
app.use(express.static(__dirname + "/public"))

app.get("/new", function(req, res){
	res.render("new")
})

app.post("/create", function(req, res){
	res.send(req.body.name)
})


//app.use('/', router)

app.listen(3000)
console.log("server starting...")
