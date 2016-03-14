'use strict';

const Cheerio = require('cheerio');

const Events = function(html, next) {

  const $ = Cheerio.load(html);
  const Trs  = $('.list tbody tr');
  let result = [];

  for(let i = 0; i < Trs.length; i++) {

    let Tds = Trs[i].children.filter(domElement => domElement.name === 'td')
    let event = {};

    //date
    let date = Tds[0].children[0].data;
    event.date = date.replace(/\t|\n|\r/g, ' ').split(' ').filter(Boolean).join(' ');
    event.dateTimestamp = new Date(event.date).getTime();

    //start
    let start = Tds[1].children.filter(domElement => domElement.type === 'text');
    start = start.map(domElement => domElement.data.replace(/\t|\n|\r/g, ' ').trim());
    start = start.filter(Boolean);
    event.start = start;

    //fee
    event.fee = Tds[2].children.length > 1 ? true : false;

    //description
    let descriptionHeader = Tds[3].children.filter(domElement => domElement.name === 'strong');
    let title = descriptionHeader[0].children[0].data;
    event.title = title;
    let location = descriptionHeader[0].children[1];
    location = location ? location.children[0].data.replace('at', '').trim() : 'visit/walk';
    event.location = location;

    //description body
    let description = Tds[3].children[3].data.replace(/\t|\n|\r/g, '').replace('......', '...').trim();
    event.description = description;

    //source
    event.source = Tds[3].children[6].attribs.href;

    //type
    event.type = Tds[4].children[0].data === '0' ? 'Other' : Tds[4].children[0].data;

    //Audience
    event.audience = Tds[5].children[0].data;

    result.push(event);
  }

  return next(null, result);
}

module.exports = Events;
