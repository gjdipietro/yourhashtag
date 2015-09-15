'use strict';

// Dependencies
var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 1337;


// Express Middleware
app.set('views', path.join(__dirname, 'app/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  next();
});

// Start Server
app.listen(port);
console.log('APP is running on port ' + port);