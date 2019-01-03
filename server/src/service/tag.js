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
    schema: new Schema(
        {
            name:  String,
        },
        { 
            collection: 'tag',
            timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
        }
    ),

    /**
     * actions to modify database
     */
    action: {

        get: function () {
            if (PermissionService.test(this.permission.read)) {

            }
        },
        create: function (data) {
            if (PermissionService.test(this.permission.create)) {
                
            }
        },
        update: function () {
            if (PermissionService.test(this.permission.update)) {

            }
        },
        delete: function (userId) {
            if (PermissionService.test(this.permission.delete)) {
                
            }
        }
    }

};