const dbCredentials = {
    dest: 'mongodb://ds117164.mlab.com:17164/wt18-hf-rm-tj',
    user: 'node-user',
    password: 'Zf^8&!C!w9h*tE?j',
    db: 'wt18-hf-rm-tj'
};

const express = require('express');
const mongo = require('mongodb');
var app = express()

// insert into
mongo.MongoClient.connect(dbCredentials.dest, {user: dbCredentials.user, pass: dbCredentials.password})
    .then(mongoClient => mongoClient.db(dbCredentials.db))
    .then(db => db.createCollection('dudes'))
    .then(coll => coll.collection('dudes').insertOne({name: 'Optimus', user: 'Prime'}))
    .catch((err) => {
        console.log(err);
    });