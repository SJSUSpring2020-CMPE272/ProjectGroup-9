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

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {

    cb(null, "new.jpg");
  }
});

const upload = multer({ storage });
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename : './keyFile.json'
})


// const projectId = 'ethereal-icon-259321';
// const keyFilename = './keyFile.json';
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage({projectId, keyFilename});
// storage
//   .getBuckets()
//   .then((results) => {
//     const buckets = results[0];

//     console.log('Buckets:');
//     buckets.forEach((bucket) => {
//       console.log(bucket.name);
//     });
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });
// try {
//     const [buckets] =  storage.getBuckets();
  
//     console.log('Buckets:');
//     buckets.forEach(bucket => {
//       console.log(bucket.name);
//     });
//   } catch (err) {
//     console.error('ERROR:', err);
//   }
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharinggg
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data

app.use(bodyParser.json());

// Simple upload form
var form = '<!DOCTYPE HTML><html><body>' +
  "<form method='post' action='/upload' enctype='multipart/form-data'>" +
  "<input type='file' name='image'/>" +
  "<input type='submit' /></form>" +
  '</body></html>';

app.get('/', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(form);
});


app.get('./uploadImage', function(req, res, next) {
    
})
app.post('/recognizeImage',async function(req,res){
  let result = {};
  await client.webDetection('./uploads/new.jpg')
  .then(async results => {
    console.log(results[0]);
      const labels = results[0].labelAnnotations;
      // console.log("Labels:",results[0].labelAnnotations);
      console.log("Best Labels:",results[0].webDetection.bestGuessLabels);
       labels.forEach(label=> console.log(label.description));
      result = results[0].webDetection.bestGuessLabels[0];
      
      
    res.writeHead(200,{
      'Content-Type' : 'text/plain'
  })
  console.log(result);
  res.end(results[0].webDetection.bestGuessLabels[0].label);
  
  })
  .catch(err => {
      // console.log("ERROR", err);
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
    })
    res.end("Error");
  })
     
});

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