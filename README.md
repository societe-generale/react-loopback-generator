React Loopback Generator
====================

What is this generator ?
========================

This repository provides a [Yeoman](http://yeoman.io/) generator for react as a frontend and loopback as a backend.
It provides following features:

 * Generate Loopback server or/and React front client
 * Docker environment
 * Quick configuration for PostgreSQL and MondoDB

Prerequisites
=============

 * Install [nvm](https://github.com/creationix/nvm)
 * Install [docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/)
 * With nvm install the v6 of Node, at user scope: `nvm install 6.9.5`
 * run `nvm use 6.9.5`
 * Ports 80 and 35729 free on your host

How to install in order to use it?
==================================

``` bash
npm install -g yo
npm install -g git+ssh://git@github.com:societe-generale/react-loopback-generator.git
```

If you want to use your local version of react-loopback generator, cd into react-loopback-generator folder and run:
``` bash
npm link
```

How to generate a project?
==================================

Go in folder where you want to generate the project, and run:

``` bash
yo react-loopback
```

Follow instructions:

 * **Application name**: name of your application
 * **Application folder**: name of the project folder
 * **Client?**: generate a React client?
 * **Server?**: generate a Loopback server?
 * **Server port?**: choose the port of the generated app.

Wait a few minutes while dependencies are installed and follow the generated documentation

How to add a database?
======================

PostgreSQL, MongoDB or Elasticsearch
------------------------------------

``` bash
yo react-loopback:server-datasource
```

Initially, the server comes with an in memory datasource. If you choose postgresql or mongodb, this in memory database will be replaced by the database, so it'll ask you if you want to override the datasource.json. Answer yes !

Then, you'll need to restart the docker-compose process by doing Ctrl+C and then `docker-compose up`

If you're using postgresql, you'll need to run the migration by doing `docker-compose exec server node_modules/.bin/db-migrate up`

Notice that if the server doesn't want to start, it's because the database starts slowly. Change something in the server folder, this will reboot the server and it'll be ok.

Other database
--------------

 * Add databse manually in  `docker-compose.yml`
 * Run `slc loopback:datasource`
 * Install corresponding Loopback connector
 * Add config in `server/boot/healtcheck.js`

And then?
=========

 * Read and update the **generated documentation** in your project directory
 * Init your Git repository `git init` and create a Github repository
 * Configure CircleCI: enable project, and update status badge in the generate README.mu
 * You can use [slc commands](https://docs.strongloop.com/display/public/LB/Command-line+reference), or use the following subgenerators:
  * `yo react-loopback:client-reducer`: Generator to create client reducer
  * `yo react-loopback:client-component`: Generator to create client component
  * `yo react-loopback:server-datasource`: Generator to add datasource

Devtools
========================

#### Redux Devtools Extension
Generator uses Redux Devtools Extension for Redux logic debugging/monitoring.
Full documentation available at: [Redux Devtools Extension @ GitHub](https://github.com/zalmoxisus/redux-devtools-extension)

#### Chrome Dev Tools
Line by line debugging is available with the generator. More info on how to use it [here](https://blog.hospodarets.com/nodejs-debugging-in-chrome-devtools)

Webpack
=======

Webpack configuration documentation available [here](documentation/webpack.md)

How to contribute?
==================

See [CONTRIBUTING.md](CONTRIBUTING.md)
