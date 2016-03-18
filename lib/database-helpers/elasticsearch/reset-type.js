'use strict';

const ClientES = require('./client')(process.env.SEARCHBOX_URL);

const deleteType = function (next) {

  let events = 0;

  ClientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_LM,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      },
    }
  }, function getMoreUntilDone(error, response) {

      var bulkDelete = [];

      response.hits.hits.forEach(function (event) {
        bulkDelete.push({ "delete" : { "_index" : process.env.ES_INDEX, "_type" : process.env.ES_TYPE_LM, "_id" : event._id } });
        events += 1;
      });

      if (response.hits.total !== events) {
        ClientES.scroll({
          scrollId: response._scroll_id,
          scroll: '30s',
          size: 1000,
        }, getMoreUntilDone);
      } else {
        //delete with bulk
        ClientES.bulk({body: bulkDelete}, function(errBulk, responseBulk){

          return next(errBulk, responseBulk);
        })
      }

  });
}

module.exports = deleteType;
