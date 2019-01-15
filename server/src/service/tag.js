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
        create: SecurityConfiguration.LOGGED_IN,
        read: SecurityConfiguration.ALL,
        update: SecurityConfiguration.ADMIN,
        delete: SecurityConfiguration.ADMIN
    },

    /**
     * database schema
     */
    Tag: mongoose.model('Tag', new Schema(
      {
          name: {type: String},
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

    get: function (data) {
        if (PermissionService.test(this.permission.read)) {
            var query = this.Tag.find(data);
            // execute the query at a later time
            query.exec(function (err, tags) {
                // Prints the users
                console.log(tags);
            });
        }
    },
    
    create: function (data) {

        return new Promise((resolve, reject) => {

            if (PermissionService.test(this.permission.create)) {

                console.log('find tag?');

                // TODO maybe unique index?
                this.Tag.findOne({name: data.name}).exec(function (err, result) {

                    if (err) {

                        console.log('ERROR - TODO ERROR HANDLING!!!!');
                        reject(err);

                    } else {

                        if (result) {

                            console.log('Tag ALREADY EXISTS:' + result);
                            resolve(result);

                        } else {

                            new this.Tag({
                                name: data.name
                            }).save().then(
                              function (result) {
                                  console.log('Tag CREATED:' + result);
                                  resolve(result);
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

    update: function () {
        if (PermissionService.test(this.permission.update)) {

        }
    },
    delete: function (userId) {
        if (PermissionService.test(this.permission.delete)) {

        }
    }

};