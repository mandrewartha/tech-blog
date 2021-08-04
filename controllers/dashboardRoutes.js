const express = require('express');
const router = express.Router();
const db = require('../models');
const withAuth = require("../utils/auth.js")

router.get("/", withAuth, (req,res)=> {
    db.Post.findAll({
        where:{
            user_id: req.session.user_id
        }
    }).then(data => {
        const allPost = data.map(post=> post.get({
            plain:true
        }))
        res.render("admin", {layout:"dashboard", allPost})
    })
})

//newPost
router.get("/newPost", withAuth, (req,res)=>{
    res.render("newPost", {layout:"dashboard"})
})

//editPost
router.get("/editPost/:id", withAuth, (req,res) =>{
    db.Post.findByPk(req.params.id).then(data => {
        const post = data.map(post=> post.get({
            plain:true
        }))
        res.render("editPost", {layout:"dashboard", post})
    })
})

module.exports = router