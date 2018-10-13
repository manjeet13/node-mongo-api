const express       = require("express");
const mongoose      = require("mongoose");
const bodyParser    = require("body-parser");
const config = require('./config');

var app = express();
var util = require('./util');
var userRoutes      = require('./routes/user');
var postRoutes      = require('./routes/post');

var utilObj = new util();
mongoose.connect(config.dbUrl, { useNewUrlParser: config.useNewUrlParser });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/users/:id/posts', postRoutes);

console.log(process.env.PORT);
//start the server
app.listen(config.PORT, (err)=> {
    if(err) {
        console.log('Something went wrong while starting the server: ', err);
    } else {
        console.log('app is running ... ..... ...........');
    }
})