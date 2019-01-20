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
        create: SecurityConfiguration.BASIC_USER,
        read: SecurityConfiguration.ALL,
        update: SecurityConfiguration.ADMIN,
        delete: SecurityConfiguration.ADMIN
    },

    /**
     * database schema
     */
    Tag: mongoose.model('Tag', new Schema(
      {
          name: {type: String, unique: true},
      },
      {
          collection: 'tag',
          timestamps: {createdAt: 'created_at'}
      }
      )
      .index('name', {unique: true})
    ).on('error', function (err) {
        console.log('Tag error: ' + err);
    }),

    /**
     * get tag data
     * @param data
     * @param user
     */
    get: function (data, user) {
        if (PermissionService.test(this.permission.read, user.privilege)) {
            var query = this.Tag.find(data);
            // execute the query at a later time
            query.exec(function (err, tags) {
                
            });
        }
    },

    /**
     * create tag
     * @param data
     * @param user
     * @returns {Promise}
     */
    create: function (data, user) {

        return new Promise((resolve, reject) => {

            if (PermissionService.test(this.permission.create, user.privilege)) {

                this.Tag.findOne({name: data.name}).exec(function (err, result) {

                    if (err) {
                        reject(err);

                    } else {
                        // Tag already exists
                        if (result) {
                            resolve(result);
                        } else {

                            new this.Tag({
                                name: data.name
                            }).save().then(
                              result => {
                                  resolve(result);
                              },
                              error => {
                                  reject(error);
                              }
                            );

                        }
                    }

                }.bind(this));

            } else {
                reject("PERMISSION DENIED: CREATE TAG");
            }
        });

    },

    /**
     * TODO TBD
     */
    update: function () {
        if (PermissionService.test(this.permission.update)) {

        }
    },

    /**
     * TODO TBD
     * @param userId
     */
    delete: function (userId) {
        if (PermissionService.test(this.permission.delete)) {

        }
    }

};