const express = require('express');
const router = express.Router();
const db = require('../models');
const withAuth = require('../utils/auth');

router.post("/", withAuth, (req,res)=>{
    db.Post.create({body:req.body, user_id:req.session.user_id}).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json(err)
    })
})

router.put("/:id", withAuth, (req,res) =>{
    db.Post.update(req.body,{
        where:{
            id:req.params.id
        }
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json(err)
    })
})

//delete