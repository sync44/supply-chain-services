'use strict';

const fs = require('fs');

const util = require('util');
const express = require('express');
const HttpStatus = require('http-status-codes');
const validate = require('jsonschema').validate;
const schema = require('./schema');
//const proof = require('../services/proof');
const bodyParser = require('body-parser');  


var app = express();

// var usersApis;

app.get('/checkapis', async (req, res) => {
    var trackingId = req.headers['tracking-id'];
    var userId = req.headers['user-id'];
    
    // TODO: Get the proofs list according to this trackingId
    // TODO: Get the list of APIs according to this userId
    var userApi = getUserApisList(userId);
    // TODO: Call the APIs one by one with the proofs
    // TODO: Combine the results to one result and return it.
});

// var userApi = getUserApisList("userId5");
// console.log(userApi);

function readProperties(){
    // TODO: Read properties file and enter them to the global map (usersApis)
    var rawdata = fs.readFileSync('./supply-chain-services/config/external.api.json');  
    var usersApis = JSON.parse(rawdata);  
    return usersApis;
}

function getUserApisList(userId){
    // TODO: get the list of APIs for this user
    var usersApis = readProperties();
    if (usersApis.hasOwnProperty(userId))
    {
        return usersApis[userId]
    } else {
        return "nothing find"
    }
}

