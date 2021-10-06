const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Set up user database
mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});



const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  const newUser = new User({
    email:req.body.email,
    password:req.body.password
  });
  newUser.save(function(err){
    if (err){
      console.log(err);
    } else {
      res.render("secrets")
    }
  })
});

app.post("/login", function(req, res){
  User.findOne({email: req.body.username, password:req.body.password}, function(err, foundUser){
    if (foundUser){
      res.render("secrets");
    } else {
      console.log("User doesn't exist");
    }
  })
});



app.listen(3000, function(){
  console.log("Server is on port 3000");
})
