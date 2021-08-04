const express = require('express');
const router = express.Router();
const db = require('../models');
const withAuth = require('../utils/auth');

router.get("/", (req,res) => {
    db.Post.findAll({
        //finding user info with the posts
        include: [db.User]
    }).then(data => {
        const allPost = data.map(post=> post.get({
            plain:true
        }))
        res.render("allPost", {layout:"dashboard", allPost})
    })
})

router.get("/post/:id",(req,res)=> {
    db.Post.findByPk(req.params.id, {
        include: [
            db.User,
            //including comments with post and commentor user id
            {
                model:db.Comment,
                include:[db.User]
            }
        ]
    }).then(data=>{
        if(data){
            const post = data.get({plain:true})
            res.render("singlePost", {post})
        } else {
            //send error and then end connection to backend
            res.status(404).end()
        }
    })
})

router.get("/login", (req,res) =>{
    if(req.session.loggedIn){
      res.redirect("/")  
      return 
    }
    res.render("login")
})

router.get("/logout", (req,res)=>{
    req.session.destroy();
    res.send("logged out");
})

router.get("/profile", (req,res) =>{
   if(req.session.user){
    db.User.findByPk(req.session.user.id,{
        include:[db.Lunch]
    }).then(userData =>{
        const userJson = userData.get({plain:true})
        console.log(userJson)
        res.render("profile", userJson)
    })
    
} else{
    res.redirect("/login")
}
})

router.get("/signUp", (req,res) =>{
    if(req.session.loggedIn){
        res.redirect("/")  
        return 
      }
    res.render("createUser")
})

module.exports = router