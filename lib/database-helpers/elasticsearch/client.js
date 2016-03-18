'use strict';

const Elasticsearch = require('elasticsearch');

const createClient = function (host) {

  const client = new Elasticsearch.Client({
    host: host,
    log: 'error'
  });

  return client;
}

module.exports = createClient;
