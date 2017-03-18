//Dependencies
var express = require ('express');
var router = express.Router();

//link the Article database file to controller.js
var Article = require('../models/Article.js');

//Main Route
router.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

// Route to get all saved articles
router.get('/api/saved', function(req, res) {
  Article.find({}).sort({pubdate:-1})
    .exec(function(err, doc){
      if(err){
        throw err;
      }
      else {
        res.send(doc);
      }
    });
});

// Route to add an article to saved list
router.post('/api/saved', function(req, res){
  var newArticle = new Article(req.body);
  Article.create(
    {title: req.body.title, 
     url: req.body.url, 
     pubdate: req.body.pubdate
   }).then(function(err, doc){
     res.send(doc);
   });
});

// Route to delete an article from saved list
router.delete('/api/saved/:id', function(req, res){
  Article.remove({
    _id: req.params.id
  }, function(err,doc){
    if (err) throw err;
    res.send(doc);
  });
});

module.exports = router;