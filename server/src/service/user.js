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
        read: SecurityConfiguration.ALL,
        update: SecurityConfiguration.OWNER,
        delete: SecurityConfiguration.ADMIN
    },

    role: {
        user: SecurityConfiguration.BASIC_USER,
        moderator: SecurityConfiguration.OWNER,
        admin: SecurityConfiguration.ADMIN
    },

    User: mongoose.model('User', new Schema(
      {
          uid: {type: String, index: true},
          email: {type: String, unique: true, select: false},
          name: String,
          privilege: {type: Number, default: SecurityConfiguration.BASIC_USER}
      },
      {
          collection: 'user',
          timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
      }
    )),

    get: function (data) {

        return new Promise((resolve, reject) => {
            if (PermissionService.test(this.permission.read)) {
                this.User.find(data)
                .select("+email")
                .exec(function (err, users) {
                    if (err) {
                        reject(err);
                    } else {
                        if(users.length) {
                            resolve(users);
                        } else {
                            reject('No User found');
                        }

                    }
                });
            } else {
                reject("PERMISSION DENIED: UserService->get");
            }
        });

    },

    create: function (data) {

        return new Promise((resolve, reject) => {
            // test for permission and creates the user
            if (PermissionService.test(this.permission.create)) {
                let _this = this;
                new _this.User({
                    email: data.email,
                    name: data.name,
                    uid: data.uid
                }).save().then(
                  user => {
                      console.log('USER CREATED:' + user);
                      resolve(user)
                  },
                  error => {
                      reject(error);
                  }
                );
            }
        });

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
