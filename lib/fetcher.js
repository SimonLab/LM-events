'use strict';

const fs    = require('fs');
const Wreck = require('wreck');
const wreck = Wreck.defaults({
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 5.1; rv:19.0) Gecko/20100101 Firefox/19.0' }
});

const fetcher = function(eventUrl, next) {

  wreck.get(eventUrl, function (error, response, html) {

    if(error) {
      return next(error);
    }

    if(response.statusCode !== 200) {
      error = response.statusCode
    }

    return next(error, html);
  });

}

module.exports = fetcher;
