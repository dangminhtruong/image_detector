var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/csdl_dpt";

/* GET home page. */
router.get('/', function(req, res, next) {
     new Promise((resolve, reject) => {
         MongoClient.connect(url, function(err, db) {
             if (err) throw err;
             let databse = db.db('csdl_dpt');
             databse.collection("images").insertOne(req.query.qoute, function(err, res) {
               if (err){
                 reject(err);
               };
               db.close();
               resolve('ok');
             });
         });
     }).then((mess) => {
         res.send("Ok");
     }).catch((err) => {
         res.send(err);
     });
    console.log(req.query.qoute);
    res.send(req.query.qoute);
});

module.exports = router;
