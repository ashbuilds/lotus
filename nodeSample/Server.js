/**
 * Created by indy-Ashish on 2/23/17.
 */
 
// calling packages
var express    = require('express');        // express
var app        = express();                 // define express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 1337;     


var router = express.Router();           
//var path = "/";

router.use(function(req, res, next) {
  res.json({ message: 'Test api on azure' });  
 console.log("dir name : ",__filename,__dirname);
    
    next(); 
});

/*router.get(path, function(req, res) {
    res.json({ message: 'Test api on azure' });   
});*/

//app.use(path+'api', router);
app.listen(port);

 //console.log(__filename,__dirname);
console.log('Server on port : ' + port);
