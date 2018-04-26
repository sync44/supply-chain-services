'use strict';

//const util = require('util');
const express = require('express');
const HttpStatus = require('http-status-codes');
//const validate = require('jsonschema').validate;
//const schema = require('./schema');
const proof = require('../services/proof');
const bodyParser = require('body-parser');  
//const http = require('http');
const request = require('request-promise');

var app = express();

app.get('/checkapis', async (req, res) => {
    var trackingId = req.headers['tracking-id'];
    var userId = req.headers['user-id'];
    
    // TODO: Get the proofs list according to this trackingId
    // TODO: Get the list of APIs according to this userId
    var userApi = getUserApisList(userId);
    
     // TODO: Call the APIs one by one with the proofs
     for (api in apisList){
        var response = PostReq(api,proofs);
        if(response.result.error){
            console.log(`API: ${api} returned error in its result: ${response.result.error}`);
            return false;
        }
    }

    return true;
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

function getProofs(trackingId){
    var opts = { 
        trackingId, 
        decrypt: req.sanitizeQuery('decrypt').toBoolean(),
        userId
      };
    
      console.log(`getting proof for ${util.inspect(opts)}`);
    
      try {
        var result = await proof.getProof(opts);
      }
      catch(err) {
        console.error(`error getting proof: ${err.message}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
      }
    
      if (!result) {
        console.warn(`no proofs for this tracking id '${opts.trackingId}' were found`);
        return res.status(HttpStatus.NOT_FOUND).json({ error: `no proofs for this tracking id '${opts.trackingId}' were found` });
      }
    
      console.log(`sending result: ${util.inspect(result)}`);
      return res.json(result);
}


function postReq(apiUrl, data) {
    var res = await request({
        url: apiUrl,
        method: "POST",
        json: true,
        body: data
    }, function (error, response, body){
        if(error){
            console.err(error);
            return null;
        }
        console.log(response);
    });

    return res;
}

