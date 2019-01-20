# STUDY UP - Question & Answer

> Web Application with Express.js, Vue.js, MongoDB, Bootstrap4

This Application is part of our WebTechnologies Project in 2018/19.

Requirement:
- Installed Docker
- Installed Node

Features:
- User Login/Register Authentication via Firebase and MongoDB User Collection
- Question & Answer with Edit
- User Section with own Posts
- Event Bus for Cross-Component Event-emit
- Data Persitence with MongoDB (Mongoose as Middleware)
- Deployment with Docker



## Build & Deployment Setup

Bootstrap without .env File on ./server

``` bash
docker-compose build
docker-compose up
```
Folders and Files are mounted into docker, so just edit files on develpment

``` bash
docker-compose up
```
Production .env File could look like that (e.g. mLab MongoDB)

``` .env
MONGO_URL="mongodb://ds159624.mlab.com:59624/wt18-hf-rm-tj"
MONGO_ROOT_USERNAME="username"
MONGO_ROOT_PASSWORD="password"
MONGO_DATABASE="wt18-hf-rm-tj"
```
## Client
``` bash
# install new dependencies after docker build once
npm install
```

## Server
``` bash
# install new dependencies after docker build once
npm install
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

