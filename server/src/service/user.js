const SecurityConfiguration = require('../configuration/security');
const PermissionService = require('./permission.js');
const DatabaseService = require('./database.js');

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
     * database structure plain
     */
    db: {
        collection: 'users',
        doc: {
            "name": "",
            "email": ""
            //many more or less
        }
    },

    /**
     * get User Permission level
     * @returns {number}
     */
    getUserPermission: function () {
        //TODO get current user and return the permission level
        return 5;
    },

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
                console.log('create privilege given');
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
                return DatabaseService.delete(
                    DatabaseService.query.delete(
                        this.db.collection,
                        userId
                    )
                );
            }
        }
    }

};