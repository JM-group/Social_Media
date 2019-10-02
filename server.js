const express = require('express');
const bodyParser = require('body-parser');
var async = require("async");
// create express app
const app = express();


// parse application/json
app.use(bodyParser.json({}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


app.use(bodyParser.raw({}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a default route
app.get('/', (req, res) => {
    console.log('inside resettt firsttt');
    res.send('NodeJS API')
});

require('./user_service/routes/user_routes.js')(app);

var server=app.listen(3000,function() {
    console.log('listening hereeeee');
});