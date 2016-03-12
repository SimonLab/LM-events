'use strict';

const Fetcher = require('./fetcher');
const Events   = require('./events');

module.exports = function(url, next) {

  Fetcher(url, function(err, html){

    if (err) {
      return next(err);
    }

    Events(html, function(err, data){
      return next(err, data);
    });
  });
};
