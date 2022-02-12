
const fs = require("fs");
const path = __dirname+"/../db/db.json";


const dbMiddleware = function(req,res,next) {

    req.saveDB = function(data,callback) {

        if (Array.isArray(data)) data = JSON.stringify(data);
        
        fs.writeFile(path,data,function(err) {
            if(err) return res.send("nope");
            callback();
        });
        
    }


    fs.readFile(path,"utf-8",function(err,file) {
        if(err) return res.status(500).end();
        req.db = JSON.parse(file);
        next();
    });
}

module.exports = dbMiddleware;



