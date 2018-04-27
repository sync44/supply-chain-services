
var express = require('express');
var app = express();

var proof = require('./proof');
var key = require('./key');
var rules = require('./rules');

app.use('/proof', proof);
app.use('/key', key);
app.use('/rules',rules);

module.exports = app;
