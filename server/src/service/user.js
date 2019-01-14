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

    role: {
        user: SecurityConfiguration.LOGGED_IN,
        moderator: SecurityConfiguration.OWNER,
        admin: SecurityConfiguration.ADMIN
    },

    User: mongoose.model('User', new Schema(
      {
        uid: { type: String, index: true },
        email: String,
        name: String,
        privilege: { type: String, default: SecurityConfiguration.LOGGED_IN }
      },
      {
          collection: 'user',
          timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
      }
    )),

    /**
     * get User Permission level
     * @returns {number}
     */
    getUserPermission: function () {
        //TODO get current user and return the permission level
        return 3;
    },

    get: function (data) {
        if (PermissionService.test(this.permission.read)) {
            var query = this.User.find(data);
            // execute the query at a later time
            query.exec(function (err, users) {
                if (err) return handleError(err);
                // Prints the users
                console.log(users);
            });

        }
    },

    create: function (data) {

        // test for permission and creates the user
        if (PermissionService.test(this.permission.create)) {
            console.log('create privilege given');
            // get user model

            console.log('find user?');
            this.User.find({email: data.email}).exec(function (err, result) {

                if (err) {
                    console.log('ERROR - TODO ERROR HANDLING!!!!');
                    return ;
                }

                if (result.length) {
                    console.log('WARNING - TODO USERS already registered - MESSAGE TO USER!!');
                    return;
                }

                let newUser = new this.User({
                    email: data.email,
                    name: data.name,
                    uid: data.uid
                });

                newUser.save().then(
                  function (result) {
                      console.log('USER CREATED:' + result);
                  }
                );

            }.bind(this));

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

};
