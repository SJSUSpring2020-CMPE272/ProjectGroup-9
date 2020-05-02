'use strict';

var express = require('express');
var fs = require('fs');
var util = require('util');
var mime = require('mime');
var multer = require('multer');
// var upload = multer({dest: 'uploads/'});

// const {Storage} = require('@google-cloud/storage');
var bodyParser = require('body-parser');
// var config = {
//     projectId: 'my-expense-keeper',
//     keyFilename: './keyFile.json'
//   };
 
//   let vision = require('@google-cloud/vision')({
//     projectId: 'my-expense-keeper',
//     keyFilename: './keyFile.json'
//   });


  // Creates a client
var app = express();
var cors = require('cors');

const upload = multer({ storage });
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename : './keyFile.json'
})

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

// Get the uploaded image
// Image is uploaded to req.file.path
// Turn image into Base64 so we can display it easily

function base64Image(src) {
  var data = fs.readFileSync(src).toString('base64');
  return util.format('data:%s;base64,%s', mime.lookup(src), data);
}
app.post('/upload_file', upload.any(), (req, res) => {
  res.send();
});
app.listen(3001);
console.log("Server Listening on port 3001");

// 325c24f9017a3f8559d862d2a75105c0