Installation
============

Requirements
------------

Before anything, you need the following software installed on your machine:

  * [Node](https://nodejs.org/en/download/current/) >= 6
  * [Yarn](https://yarnpkg.com/en/docs/install)
  * [Docker](https://docs.docker.com/engine/installation/)
  * [Docker Compose](https://docs.docker.com/compose/install/)


How to get SSH/VPN access
---------------------
To get secured shell access to the different environments, you have to:
  - Send an email to give.me.ssh@access.com with your SSH key
  - Add your ssh key into the `path/to/file` file of the project's provisioning
  - Reprovision the servers through the OpenStack interface


Project installation
--------------------
To install the project, you must at first clone the code repository :
``` bash
    git clone git@github.com:yourrepository/<%= applicationFolder %>.git
```

Then, this project can be installed by running the install script:
``` bash
    cd <%= applicationFolder %>/
    yarn
    docker-compose up
```
And then you can access to your application by this url : http://localhost/<%= applicationName %>/

Application initialisation
--------------------------

If you try to connect your app in local environment with postgres, you'll get a 500 error from the call to /api/auth.
The reason is that the app tries to access <app_name>.sguser postgres table which does not exist yet.

### Create the private schema

Go in the postgres docker container:
``` bash
docker-compose exec postgresql bash
```
Then run the following:
``` bash
psql -d <%= applicationName %> -U <%= applicationName %> -c 'CREATE SCHEMA IF NOT EXISTS AUTHORIZATION "<%= applicationName %>"'
```

Exit the docker container.

### Run the initial migration

Then, you need to run the initial migration:
``` bash
yarn docker:db-migrate up
```
