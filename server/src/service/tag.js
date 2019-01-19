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

    get: function (data, user) {
        if (PermissionService.test(this.permission.read, user.privilege)) {
            var query = this.Tag.find(data);
            // execute the query at a later time
            query.exec(function (err, tags) {
                
            });
        }
    },
    
    create: function (data, user) {

        return new Promise((resolve, reject) => {

            if (PermissionService.test(this.permission.create, user.privilege)) {

                // TODO maybe unique index?
                this.Tag.findOne({name: data.name}).exec(function (err, result) {

                    if (err) {
                        reject(err);

                    } else {

                        if (result) {
                            console.log('Tag ALREADY EXISTS:' + result);
                            resolve(result);
                        } else {

                            new this.Tag({
                                name: data.name
                            }).save().then(
                              result => {
                                  console.log('Tag CREATED:' + result);
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

    update: function () {
        if (PermissionService.test(this.permission.update)) {

        }
    },
    delete: function (userId) {
        if (PermissionService.test(this.permission.delete)) {

        }
    }

};