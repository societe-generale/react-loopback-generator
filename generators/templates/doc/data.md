PostGreSql
==============

PostGreSql 9.5.5

First step in local env
=======================

If you try to connect your app in local environment with postgres, you'll get a 500 error from the call to /api/auth.
The reason is that the app tries to access <app_name>.sguser postgres table which does not exist yet.

Create the private schema
-------------------------

Go in the postgres docker container:
``` bash
docker-compose exec postgresql bash
```
Then run the following:
``` bash
psql -d <%= applicationName %> -U <%= applicationName %> -c 'CREATE SCHEMA IF NOT EXISTS AUTHORIZATION "<%= applicationName %>"'
```

Exit the docker container.

Run the initial migration
-------------------------

Then, you need to run the initial migration:
``` bash
npm run docker:db-migrate up
```

