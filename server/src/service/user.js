const SecurityConfiguration = require('../configuration/security');
const PermissionService = require('./permission.js');
const DatabaseService = require('./database.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {

    /**
     * Object for set the CRUD Security Levels
     */
    permission: {
        create: SecurityConfiguration.ALL,
        read: SecurityConfiguration.LOGGED_IN,
        update: SecurityConfiguration.OWNER,
        delete: SecurityConfiguration.ADMIN
    },

    /**
     * database schema
     */
    schema: new Schema(
        {
            name:  String,
            email: String,
            activated: Boolean
        },
        { 
            collection: 'user',
            timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
        }
    ),

    /**
     * get User Permission level
     * @returns {number}
     */
    getUserPermission: function () {
        //TODO get current user and return the permission level
        return 3;
    },

    /**
     * actions to modify database
     */
    action: {

        get: function () {
            if (PermissionService.test(this.permission.read)) {
                var User = mongoose.model('User', this.schema);
                var query = User.find();
                // execute the query at a later time
                query.exec(function (err, users) {
                    if (err) return handleError(err);
                    // Prints the users
                    console.log(users);
                });

            }
        },
        create: function (data) {
            //REMOVE only for test purposes
            if (data == undefined) {
                data = {
                    name: 'König Ludwig der II.',
                    email: 'luder@kingdom.org'
                }
            }
            // test for permission and creates the user
            if (PermissionService.test(this.permission.create)) {
                console.log('create privilege given');
                //TODO - this is a simple create - no duplicate user check etc.
                const newUser = mongoose.model('User', this.schema);
                newUser.name = data.name;
                newUser.email = data.email;
                newUser.save().then(
                    function(result) {
                        console.log(result);
                        // test if something in db
                        this.action.get();
                    }
                 );
            }
        },
        update: function () {
            if (PermissionService.test(this.permission.update)) {

            }
        },

        /**
         * delete an user
         * @param {string} userId
         * @returns {*|Object}
         */
        delete: function (userId) {
            if (PermissionService.test(this.permission.delete)) {
                
            }
        }
    }

};