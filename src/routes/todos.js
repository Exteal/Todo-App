const express = require("express");
const router = express.Router();


router.get('/todos',(req,res)=>{
    res.sendFile(__dirname+"/../db/db.json");
});

 
module.exports = router;