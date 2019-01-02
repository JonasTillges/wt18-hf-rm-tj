const mongo = require('mongodb');
const assert = require('assert');

const dbCredentials = {
    dest: process.env.MONGO_URL || "mongodb://mongo",
    user: process.env.MONGO_ROOT_USERNAME || "",
    password: process.env.MONGO_ROOT_PASSWORD || "",
    db: process.env.MONGO_DATABASE || "dev"
};

const dbStatus = {
    offline: false,
    online: true,
    error: 'Error String'
};

module.exports = {

    status: dbStatus.offline,
    db: undefined,

    /**
     * Creates the connection to the database
     * @returns {Promise<MongoClient>} returns Promise if no callback passed
     */
    connect: function() {
        console.log(dbCredentials);
        
        var options = {
            useNewUrlParser: true
        };

        //  check for prod mode
        if (dbCredentials.user){
            options.auth = {user: dbCredentials.user, password: dbCredentials.password}
        }

        return mongo.MongoClient.connect(dbCredentials.dest, options)
            .then(mongoClient => this.db = mongoClient.db(dbCredentials.db))
            .then(db => this.status = dbStatus.online)
            //.then(any => this.create({collection: 'dudes', doc: {name: 'Duplicate', user: 'User'}}))
            //.then(any => this.find('dudes', {"name": 'Duplicate'}))
            //.then(any => this.update({collection: 'dudes', who: {"_id": mongo.ObjectId('5c18d94cfc4c043120eab5d9')}, what: {"name": 'What'}}))
            //.then(any => this.find('dudes', {"name": 'Duplicate'}))
            //.then(any => this.delete({collection: 'dudes', doc: {"_id": mongo.ObjectId('5c18d94cfc4c043120eab5d9')}}))
            .then(any => this.find({collection: 'dudes', filter: {}}))
            .catch((err) => {
                this.status = err;
                console.log(err);
            });
    },

    /**
     * Close the connection to the database
     */
    close: function() {
        if(this.db.close()) {
            this.status = dbStatus.offline;
        };
    },

    /**
     * Find entities by given identifier object with optional filter object
     * @param {Object} data set of updates and parent
     * @returns {Object} database response
     */
    find: function(data) {
        //TODO test user for rights in collection
        this.db.collection(data.collection).find(data.filter).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records in collection " + data.collection);
            console.log('_____________________');
            docs.forEach(function (doc, index) {
                console.log('Found entity:');
                for (var key in doc) {
                    if (doc.hasOwnProperty(key)) {
                        console.log(key + " -> " + doc[key]);
                    }
                }
                console.log('_____________________');
            });
        });
    },

    /**
     * Delete an entity by given identifier object
     * @param {Object} data set of updates and parent
     * @returns {Object} database response
     */
    delete: function (data) {
        //TODO test user for delete Rights in collection
        console.log('delete from ---> ' + data.collection);
        return this.db.collection(data.collection).deleteOne(data.doc);
    },

    /**
     * Create an entity with given data
     * @param {Object} data set of insert and collection name
     * @returns {Object} database response
     */
    create: function (data) {
        //TODO test user for Insert Rights in collection
        console.log('create ---> ' + data.doc);
        return this.db.collection(data.collection).insertOne(data.doc);
    },

    /**
     * Update an entity by given identifier object and set of updates
     * @param {Object} data set of updates and collection name
     * @returns {Object} database response
     */
    update: function (data) {
        //TODO test user for update Rights in collection
        console.log('update ---> ' + data.who + ' ---> ' + data.what);
        return this.db.collection(data.collection).updateOne(data.who,{ $set: data.what });
    },

    query: {
        /**
         * generates the object to delete the mongodb doc
         * @param collection
         * @param id
         * @returns {{collection: *, doc: {_id: *}}}
         */
        delete: function (collection, id) {
            return {
                collection: collection,
                    doc: {
                    "_id": mongo.ObjectId(id)
                }
            }
        }
    }
};