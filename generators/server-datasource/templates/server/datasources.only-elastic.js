'use strict';

module.exports = {
  db: {
    name: 'db',
    connector: 'memory',
  },
  es: {
    name: 'es',
    index: process.env.ELASTIC_INDEX,
    hosts: [
      {
        protocol: "http",
        host: process.env.ELASTIC_HOST,
        port: process.env.ELASTIC_PORT
      }
    ],
    requestTimeout: 3000,
    mappings: [],
  }
};
