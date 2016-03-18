'use strict';

const ClientES = require('./client')(process.env.SEARCHBOX_URL);

const indexEvents = function (bulkEvents, next) {

  ClientES.bulk({body: bulkEvents}, function( error, response) {

    return next(error, response);
  })
}

module.exports = indexEvents;
