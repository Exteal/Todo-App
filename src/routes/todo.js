const express = require("express");
const fs = require("fs");
const router = express.Router();



router.get('/todo/:id',(req,res)=>{

    const { id } = req.params;
    res.json(req.db[id]);
        
});

router.post("/todo", (req,res) => {
 
    const {db, body : todo }= req;
    todo.id = db.length;
    
    db.push(todo);

    req.saveDB(db,() => res.send(todo));
      
});

router.delete("/todo/:id", (req,res) => {

    const {db, params : {id}} = req;

    db[id] = null;

    req.saveDB(db, () => res.send("Opération : Delete\nId : " + id +"\nRéussie")) 
});

router.patch("/todo/:id",(req,res) => {
 
    const { params : {id}, db} = req
    const oldTodo = db[id];
    const newTodo = {...oldTodo, "checked":!oldTodo.checked};

    db[id] = newTodo;

    req.saveDB(db,() => res.send(newTodo) )
});

module.exports = router;