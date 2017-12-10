var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/csdl_dpt";
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query.full);
    new Promise((resolve, reject)=>{
        MongoClient.connect(url, (err, db)=>{
            if(err){
                reject(err);
            }
            database = db.db('csdl_dpt');
            let query = req.query.full;
            
            database.collection('images').find({$text: {$search: req.query.full}}).toArray((error, results)=>{
                resolve(results);
                db.close();
            });
        });
    }).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((errors)=>{
        console.log(errors);
    });
});

module.exports = router;
