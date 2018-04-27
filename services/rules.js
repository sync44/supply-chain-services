'use strict';

//var config = require('../config');
const util = require('util');
const proof = require('./proof');
const request = require('request-promise');
const fs = require('fs');

async function checkRules(trackingId, userId, orgId, dycrypt){
  var proofs = getProofs(trackingId, dycrypt);
  var apisList = getUserApisList(orgId);
  
    // TODO: Call the APIs one by one with the proofs
    for (var api in apisList){
      var response = await postReq(api,proofs);
      if(response.result.error){
          console.log(`API: ${api} returned error in its result: ${response.result.error}`);
          return false;
      }
  }

  return true;
}

function readProperties(){
  // TODO: Read properties file and enter them to the global map (usersApis)
  var rawdata = fs.readFileSync('./supply-chain-services/config/external.api.json');  
  var usersApis = JSON.parse(rawdata);  
  return usersApis;
}

function getUserApisList(orgId){
  // TODO: get the list of APIs for this user
  var usersApis = readProperties();
  if (usersApis.hasOwnProperty(orgId))
  {
      return usersApis[orgId]
  } else {
      return "nothing find"
  }
}

function getProofs(trackingId, dycrypt){
  var opts = { 
      trackingId, 
      decrypt,
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
      return response;
  });

  return res;
}



module.exports = {
  checkRules
}
