# node-fullstack-test

Getting up and running with docker:
-----------------------------------
To use docker in the development process you need to have docker and docker-compose installed. You can find a guide to install docker and docker-compose [here](https://docs.docker.com/compose/install/).

Once you have installed docker and docker-compose you are available to use this commands

**Available commands**

- `docker-compose up` runs the whole stack (the first time builds the project)
- `docker-compose exec frontend npm run test` runs FE tests (first run docker-compose up in another terminal)
- `docker-compose exec backend npm run test` runs BE tests (first run docker-compose up in another terminal)
