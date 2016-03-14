'use strict';

const Cheerio = require('cheerio');
const Wreck = require('wreck');
const wreck = Wreck.defaults({
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 5.1; rv:19.0) Gecko/20100101 Firefox/19.0' }
});

const listUrls = function(next) {

  wreck.get(process.env.LM, function (error, response, html) {

    if(error) {
      return next(error);
    }

    if(response.statusCode !== 200) {
      error = response.statusCode
    }

    const $ = Cheerio.load(html);
    const pageLinks = $('.paging .pageLinks a');
    let urls = [process.env.LM];
    for(let i = 0; i < pageLinks.length; i++) {
      urls.push(process.env.LM_BASE_URL + pageLinks[i].attribs.href);
    }
    return next(error, urls);
  });

}

module.exports = listUrls;
