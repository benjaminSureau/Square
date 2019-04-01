const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Company = require('./models/Company');

mongoose.connect("mongodb://localhost:27017/Square").then(
    () => {console.log('Database connection is successful') },
    err => { console.log('Error when connecting to the database'+ err)}
);
var app = express();
app.use(cors());

// Normal express config defaults
//app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(require('./routes'));

/**
 * Status page
 */
app.get('/', function (req, res) {
    res.json({ status: 'OK' });
});


const port = 4000;

app.listen(port, function(){
    console.log('Listening on port ' + port);
});