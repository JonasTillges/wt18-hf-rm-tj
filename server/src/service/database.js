const mongo = require('mongodb');
const assert = require('assert');
const mongoose = require('mongoose');

const dbCredentials = {
    dest: process.env.MONGO_URL || "mongodb://mongo/",
    user: process.env.MONGO_ROOT_USERNAME || "",
    password: process.env.MONGO_ROOT_PASSWORD || "",
    db: process.env.MONGO_DATABASE || "dev"
};

const dbStatus = {
    offline: false,
    online: true,
    error: 'ERROR: '
};

module.exports = {

    status: dbStatus.offline,
    io: undefined,

    /**
     * Creates the connection to the database
     * @returns {Promise<MongoClient>} returns Promise if no callback passed
     */
    connect: function () {

        console.log(dbCredentials);

        var options = {
            useNewUrlParser: true
        };

        //  check for prod mode
        if (dbCredentials.user) {
            options.auth = {user: dbCredentials.user, password: dbCredentials.password}
            options.dbName = dbCredentials.db
        }

        // connect to mongo
        this.io = mongoose.connect(dbCredentials.dest, options).then(
          () => {
              this.status = dbStatus.online;
              console.log('database connection established');
          },
          err => {
              /** handle initial connection error */
              this.status = dbStatus.error;
              console.log(err);
          }
        );
    }

};
