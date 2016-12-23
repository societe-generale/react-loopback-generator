'use strict';

module.exports = {
  db: {
    database: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    schema: process.env.DATABASE_SCHEMA,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
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
