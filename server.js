//Dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.Promise = Promise

//requiring bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//serve static content for app from the "public" folder
app.use(express.static('./public'));

//import routes from controllers
var routes = require('./controllers/controller.js');
app.use("/", routes);

//setting up mongoose database
mongoose.connect('mongodb://heroku_gfjrhpkh:tihph9lrcdo1k6a5f2i0df2c51@ds135680.mlab.com:35680/heroku_gfjrhpkh');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

//port listener
var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('App running on port: ' + PORT);
});