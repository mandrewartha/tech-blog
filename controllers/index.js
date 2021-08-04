const express = require('express');
const { route } = require('./api');
const router = express.Router();
const apiRoutes = require("./api")
const frontEndRoutes = require("./frontEndRoutes")
const dashboardRoutes = require("./dashboardRoutes")

router.use("/api",apiRoutes)
router.use("/", frontEndRoutes);
router.use("/dashboard", dashboardRoutes)


router.get("/readsessions",(req,res)=>{
    res.json({
        sessions:req.session
    })
})


module.exports = router;

