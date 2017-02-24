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

router.get('/', function(req, res) {
    res.json({ message: 'Test api on azure' });   
});

app.use('/api', router);
app.listen(port);

console.log('Server on port : ' + port);