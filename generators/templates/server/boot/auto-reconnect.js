module.exports = function(server) {
  for (let source in server.datasources) {
    let adapterName = server.datasources[source].adapter.name;
    if (adapterName === 'postgresql') {
      server.datasources[source].connector.pg.on('error', function(err) {
        if (err.code === '57P01') {
          console.error(err);
        }
      });
    }
  }
};
