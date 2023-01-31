# TMDB Api Proxy

This is a simple/sample proxying API for TMDB with Fastify.

> This repository is only for study purposes. Must not be used in production.

## Docker

To keep it as an individual container, the following commands will work in the development env:

1. Build docker image locale `docker build -t tmdb-proxy-api -f ./Dockerfile.dev .`;
2. Run image in background, mapping the application port and specifying a shared network: `docker run -d -p 8080:8080 -v /usr/app/node_modules -v $(pwd):/usr/app tmdb-proxy-api`;
3. After running, you may see it's running with `docker ps` command.

> When usign docker, you may set env variables inline command with `-e` argument or define it on `docker-compose.yml`. To avoid use to many `-e` arguments on development or test env, you may without `docker-compose` or similar, you may use the `.env.development` or `.env.test` files and setting only `ENVIRONMENT` variable on server env.