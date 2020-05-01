'use strict';

var express = require('express');
var fs = require('fs');
var util = require('util');
var mime = require('mime');
var multer = require('multer');
// var upload = multer({dest: 'uploads/'});


  // Creates a client
var app = express();
var cors = require('cors');

app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharinggg
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(form);
});


app.get('./uploadImage', function(req, res, next) {
    
})

app.listen(3001);
console.log("Server Listening on port 3001");
