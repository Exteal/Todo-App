const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = __dirname+"/../db/db.json";

const saveDB = function(data,callBack) {
    fs.writeFile(path,data,callBack);
}

const getDB = function(callback) {
    fs.readFile(path,"utf-8",callback);
}


router.post("/todo", (req,res) => {
   getDB(function(err,file) {
        if(err) return res.send("raté");
        
        const todo=req.body;
        const jsonDB = JSON.parse(file);

        todo.id = jsonDB.length;
        jsonDB.push(todo);

        saveDB(JSON.stringify(jsonDB),function(err) {
            res.send(todo);
        });
      
    })
});

router.get('/todo/:id',(req,res)=>{

    getDB(function(err,file) {
        if(err) return res.send("raté");

        const todoID = req.params.id;
        const jsonDB = JSON.parse(file);
        res.json(jsonDB[todoID]);
        
    })
});

router.delete("/todo/:id", (req,res) => {
    getDB(function(err,file) {
    
        if(err) return res.send("raté");

        const todoID = req.params.id;
        const jsonDB = JSON.parse(file);

        jsonDB[todoID] = null;

        saveDB(JSON.stringify(jsonDB), function(err) {
            res.send("Opération : Delete\nId" + todoID +"\nRéussie")
        }) 
    })
});

router.patch("/todo/:id",(req,res) => {
    getDB(function(err,file) {
        if(err) res.send("patch-getDB")
        const todoID = req.params.id;
        const jsonDB = JSON.parse(file);
        const oldTodo = jsonDB[todoID];

        const newTodo = oldTodo;
        newTodo.checked = !oldTodo.checked;

        jsonDB[todoID] = newTodo;
        saveDB(JSON.stringify(jsonDB),function(err) {
            res.send(newTodo);
        })
    })
});

module.exports = router;