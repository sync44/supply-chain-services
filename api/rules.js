'use strict';

const express = require('express');
const rules = require('../services/rules');
//const bodyParser = require('body-parser');  
//const http = require('http');
//const request = require('request-promise');

var app = express();

app.get('/checkapis', async (req, res) => {
    var trackingId = req.headers['tracking-id'];
    var userId = req.headers['user-id'];
    var orgId = req.headers['org-id'];
    var dycrypt = req.headers['dycrypt'].toBoolean();
    
    // TODO: Get the proofs list according to this trackingId
    // TODO: Get the list of APIs according to this userId
    return rules.checkRules(trackingId, userId, orgId, dycrypt);

    
});

// var userApi = getUserApisList("userId5");
// console.log(userApi);
