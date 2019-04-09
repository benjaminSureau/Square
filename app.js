const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Company = require('./models/Company');
const Notification = require('./models/Notification');
const Hobby = require('./models/Hobby');
const Skill = require('./models/Skill');
const Qualification = require('./models/Qualification');
const Job = require('./models/Job');

/*mongoose.connect("mongodb://localhost:27017/Square").then(
    () => {console.log('Database connection is successful') },
    err => { console.log('Error when connecting to the database'+ err)}
);*/

mongoose.connect('mongodb://localhost:27017/Square', { useNewUrlParser: true });
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