'use strict';

require('env2')('.env');
const ListUrls = require('./pages-url');
const Fetcher  = require('./fetcher');
const Events   = require('./events');

module.exports = function(next) {

  //find number of pages and create urls
  ListUrls(function(err, urls){
    console.log(urls);
    let result = [];
    let counter = 0;

    urls.forEach(function(url) {

      Fetcher(url, function(err, html){

        if (err) {
          return next(err);
        }

        Events(html, function(err, data){
          counter += 1;
          result = result.concat(data);
          if( counter === urls.length) {
            result = result.sort(function(a, b) {return a.dateTimestamp - b.dateTimestamp;})
            return next(err, result);
          }
        });
      });
    })
  })
};
