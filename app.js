//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose= require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Currently, the world is facing countless challenges. To pass on a rich and vibrant society to future generations, we need to solve various societal challenges related to the environment, energy, food, health and medicine, safety and disaster prevention, and respect for human rights, while also ensuring economic growth. Companies are expected to contribute to solving these challenges and to creating a sustainable society through innovation in collaboration with various stakeholders."
const app = express();
app.set('view engine', 'ejs');

const Posts=[];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useUnifiedTopology: true, useNewUrlParser: true, });

const postSchema=({
  title:String,
  content: String
})

const Post= mongoose.model("Post", postSchema);



app.get("/", function(req, res){
  Post.find({}, function(err, results)
  {
    if(!err)
    {
      res.render("home", {content:homeStartingContent, posts:results});
    }
  })
})

app.get("/about", function(req, res){
  res.render("about", {});
})

app.get("/contact", function(req, res){
  res.render("contact", {});
})

app.get("/compose", function(req, res){
  res.render("compose");
})

app.get("/posts/:post_id", function(req, res){

  const postid= req.params.post_id;

  Post.findOne({_id:postid}, function(err, results){
    if(!err)
    {
        res.render("post", {content:results});
    }
  })

})

app.post("/compose", function(req, res){
  const post= new Post({
    title:req.body.postTitle,
    content:req.body.postBody
  });
  post.save(function(err){
    if(!err)
        res.redirect("/");
  });

})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
