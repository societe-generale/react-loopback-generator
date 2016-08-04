module.exports = function(server) {
  // @TODO: add healthchecks https://github.com/fastit/health-check#database-health-check
  var config = {};

  // @TODO: UNCOMMENT THIS IF YOU HAVE POSTGRESQL DATABASE
  //
  // PostgreSQL
  //
  // const pg = require('pg');
  // db = {
  //   name: '@TODO',
  //   host: '@TODO',
  //   port: '@TODO',
  //   username: '@TODO',
  //   password: '@TODO'
  // };
  // connectionString = "postgres://" + db.username + ":" + db.password + "@" + db.host + ":" + db.port + "/" + db.name;
  //
  // config.postgres = {
  //   client: new pg.Client(connectionString)
  //};


  // @TODO: UNCOMMENT THIS IF YOU HAVE MONGODB DATABASE
  //
  // MongoDB
  //
  // const mongodb = require('mongodb');
  // db = {
  //   name: '@TODO',
  //   host: '@TODO',
  //   port: '@TODO',
  //   username: '@TODO',
  //   password: '@TODO'
  // };
  // connectionString = "mongodb://" + db.username + ":" + db.password + "@" + db.host + ":" + db.port + "/" + db.name;
  // MongoClient = mongodb.MongoClient;
  // mongoClient = new MongoClient();
  // mongo.mongoClient.connect(url, function(err, db) {
  //   if (err != null) {
  //     return;
  //   }
  //   config.mongo = {
  //     client: db
  //   };
  // });

  // @TODO: UNCOMMENT THIS IF YOU HAVE ELASTICSEARCH DATABASE
  //
  // Elasticsearch
  //
  //
  // elasticsearch = require('elasticsearch');
  //
  // db = {
  //   host: '@TODO',
  //   port: 9200
  // };
  //
  // config.elasticsearch = {
  //   client: new elasticsearch.Client({
  //     host: db.host + ':' + db.port,
  //     log: 'debug'
  //   })
  // };

  healthcheck = require('healthcheck-fastit')(config);
  server.use(healthcheck);
};
