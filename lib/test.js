'use strict';

const Fs = require('fs');
const GetEvents = require('./index');
const ResetType = require('./database-helpers/elasticsearch/reset-type');
const IndexEvents = require('./database-helpers/elasticsearch/index-events');

GetEvents(function(error, events) {
  console.log('get the events')
  console.log('data', events.length);
  console.log('reset the database');
  ResetType(function(error, response) {
    console.log('errorReset', error);

    console.log('add the new data');
    //add to elasticsearch
    let indexBulk = [];
    events.forEach(function(event, id) {

      indexBulk.push({ index: { _index: process.env.ES_INDEX, _type: process.env.ES_TYPE_LM, _id: id} });
      indexBulk.push(event);
    })

    IndexEvents(indexBulk, function(error, response) {
      console.log('errorIndex', error);
    })
  })
  // Fs.writeFileSync('./events.json', JSON.stringify(data), 'utf8');
})
