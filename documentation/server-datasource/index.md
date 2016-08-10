Datasource generator
====================

```bash
yo sg-fastit:server-datasource
```

Postgresql case
---------------

After generating postgresql configuration, you should (uncomment the docker-compose)[https://github.com/theodo/generator-sg-fastit/blob/master/generators/templates/docker-compose.development.yml#L53] file to enable the postgresql container.
Next rerun `docker-compose -f docker-compose.development.yml up`.

After that, run `docker exec -i -t yourapplication_server_1 ./node_modules/.bin/db-migrate up` to log in the container and update the database.

And now you are ready to use the database.
