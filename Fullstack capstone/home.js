var express = require('express')  
var mongojs = require('mongojs')
var app = express() 

var cString = "mongodb+srv://Roshini:roshini1331@cluster0.dupkc.mongodb.net/RoshiniDatabase?retryWrites=true&w=majority";
var db = mongojs(cString, ["usersdata","events"])

app.use(express.static('public'));  
app.set('view engine', 'ejs');

app.get('/', function (req, res) {  
	res.sendFile(__dirname+"/public/register.html")
})  

app.get('/signup', function (req, res) {  
	var user = {
	Name : req.query.name,
	Email : req.query.email,
	Password : req.query.password,
	College : req.query.college
	}
	db.usersdata.insert(user, function(err,docs){
		if(err){
			res.send("Something went wrong.Please try again.")
		}
		else{
			//res.send("Signup Successful....")//to display in browser
			//res.send(req.query.name)
			res.sendFile(__dirname+"/public/signinPage.html")
		}
	})
}) 

app.get('/addevent', function (req, res) {  
	
	//console.log(res.query);

	var info = {
		College: req.query.collegename,
		Event : req.query.event,
		Time_Period : req.query.time,
		Contact_Number : req.query.number,
		Link : req.query.link,
	}
	db.events.insert(info, function(err,docs){
		if(err){
			res.send("Something went wrong.Please try again.")
		}
		else{
			res.sendFile(__dirname+"/public/SuccessPage.html")
		}
	})
}) 



app.get('/login', function (req, res) {  
	//console.log(res.query);
	var user = {
		Email : req.query.emaillogin,
		Password : req.query.passwordlogin
	}
	db.usersdata.find(user, function(err,docs){
		if(err){
			res.send("Error encountered!!")
		}
		if(docs.length>0){
			//res.send("Successful")
			db.events.find({}, function(err, docs){
				if(err){
					res.send("Something went wrong")
				}
				else{
					res.render("dashboard", {result : docs})
				}
			})	
		}
		else{
			res.send("Please check your credentials")
		}
	})

}) 

/*app.get('/dashboard', function (req, res){

		//db.usersdata.find({}, function(err,docs){
		//res.send(docs)
	var d = {
		name : "Roshini",
		email : "Rosh@gmail.com" 
	}

	res.render("dashboard", {result : d})


})*/


  
app.listen(3000, function () {  
console.log('Example app listening on port 3000!')  
})
