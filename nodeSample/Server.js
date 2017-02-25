/**
 * Created by indy-Ashish on 2/23/17.
 */
var express    = require('express');        // express
var app        = express();                 // define express
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 1337;  
var router = express.Router();  

router.use(function(req, res, next) {
  res.send('Hello World');
});

app.listen(port);
console.log('Server on port : ' + port);
/*var http = require("http");
 var port = process.env.PORT || 1337;
 http.createServer(function (request, response) {
response.writeHead(200, {'Content-Type': 'text/plain'});
   response.end( __dirname+' : Hello World\n');
 }).listen(port);
console.log('Server running...');*/
// calling packages
/*
var express    = require('express');        // express
var app        = express();                 // define express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../nodeSample'));
var port = process.env.PORT || 1337;     


var router = express.Router();           
var path = "/";

router.use(function(req, res, next) {
  res.json({ message: 'Test api on azure' });  
    //console.log("dir name : ",__filename,__dirname);
    
    next(); 
});

router.get(path, function(req, res) {
    res.json({ message: 'Test api on azure' });   
});

app.use(path+'api', router);
app.listen(port);

console.log('Server on port : ' + port);
*/
