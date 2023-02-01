# TMDB Api Proxy

This is a simple/sample proxying API for TMDB with Fastify.

> This repository is only for study purposes. Must not be used in production.

## How it works?

[TMDB Api](https://developers.themoviedb.org/3/getting-started/introduction) works with two variables across requests, they are:

- `api_key`: for accessing resources;
- `session_id`: to authenticate the user when required.

In a regular web application, you don't want to expose your `api_key` or even the `session_id` as a regular text on local storage. This is the main reason to use this proxy.

- It will keep your `api_key` in an environment variable and add to proxied requests as a authorization header;
- It will convert the `session_id` to an `HttpOnly` cookie and share to client, but when proxy the request it will use `session_id` as a query string parameter.

## How to use it?

### Development Environment

Copy the `.env.example` file to `.env.development` file. Fill it with `API_KEY` and `COOKIE_SECRET`.

#### Option 1 - Terminal

Run `npm run start` command. It will start listening on `0.0.0.0:8080`, call it with any endpoint from [TMDB Api](https://developers.themoviedb.org/3/getting-started/introduction) and see the magic.

#### Option 2 - Docker

You can use the `docker-compose.yaml` file to build and run the container. After, it will start listening on `localhost:8080`, call it with any endpoint from [TMDB Api](https://developers.themoviedb.org/3/getting-started/introduction) and see the magic.

You may use the docker commands instead `docker-compose.yaml`:

1. Build: `docker build -t tmdb-proxy-api -f ./Dockerfile.dev .`;
2. Run: `docker run -d -p 8080:8080 -v /usr/app/node_modules -v $(pwd):/usr/app --env-file .env.development tmdb-proxy-api`;
3. After running, you may see it's running with `docker ps` command.

### Test Environment

Copy the `.env.example` file to `.env.test` file. Fill it with `API_KEY` and `COOKIE_SECRET`. Then, run `npm run test` to watch all tests or `npm run test:once` to run once.

### Production Environment

This repository is only for study purposes. Must not be used in production. But, if you want to try... Copy the `.env.example` file to `.env.production` file. Fill it with `API_KEY` and `COOKIE_SECRET`. You can use `npm run build` to build all `.js` files and then `npm run launch` to start listening.

You can do it with docker:

1. Build: `docker build -t tmdb-proxy-api -f ./Dockerfile.prod .`;
2. Run: `docker run -d -p 8080:8080 -v /usr/app/node_modules -v $(pwd):/usr/app --env-file .env.production tmdb-proxy-api`;
3. After running, you may see it's running with `docker ps` command.
