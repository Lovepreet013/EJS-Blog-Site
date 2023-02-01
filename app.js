const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

const aboutContent = "This is about page of blog site";
const contactContent = "This is contact page";

app.get("/",function(req,res){
    res.render(__dirname + "/views/home.ejs",{posts:posts});
})

app.get("/about",function(req,res){
    res.render(__dirname + "/views/about.ejs",{theAboutContent:aboutContent});
})

app.get("/contact",function(req,res){
    res.render(__dirname + "/views/contact.ejs",{theContactContent:contactContent});
})

app.get("/compose",function(req,res){
    res.render(__dirname + "/views/compose.ejs");
})
app.post("/compose",function(req,res){
    let post = {
        title: req.body.postTitle,
        body : req.body.postBody
    }
    posts.push(post);
    res.redirect("/");
})


app.get("/post/:title",function(req,res){
    const requestedTitle = _.lowerCase(req.params.title);

    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title);

        if(requestedTitle === storedTitle){
            // console.log("match found");
            res.render(__dirname + "/views/post",{title: post.title, body: post.body})
        }
    })
})

app.listen(3000,function(){
    console.log('listening on port 3000');
})