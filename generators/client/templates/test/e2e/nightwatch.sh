#!/bin/bash
CONTAINER_ID=$(docker ps --format '{{.ID}}' -f 'name=gaia-mock' )
if [ -z "${CONTAINER_ID}" ];
then
  echo "[DOCKER CONTAINER NOT STARTED] : gaia-mock"
else
  cat ./test/e2e/createTestUserMongo.txt | docker exec -i ${CONTAINER_ID} mongo gaia-mock
fi




