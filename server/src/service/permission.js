const UserService = require('./user.js');

module.exports = {


    /**
     * test action for permission
     * @param {number} requiredPermission
     * @param {number|undefined} [givenPermission=undefined]
     * @returns {boolean} returns true for permission
     */
    test: function(requiredPermission, givenPermission) {

        if (givenPermission === 'undefined') {
            UserService.getUserPermission();
        }

        if(requiredPermission <= givenPermission) {
            return true;
        }
        return false;
    },


};