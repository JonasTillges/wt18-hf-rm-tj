const SecurityConfiguration = require('../configuration/security');

module.exports = {

    /**
     * test action for permission
     * @param {number} requiredPermission
     * @param {number|undefined} [givenPermission=undefined]
     * @returns {boolean} returns true for permission
     */
    test: function (requiredPermission, givenPermission) {

        if (requiredPermission === SecurityConfiguration.ALL || requiredPermission <= givenPermission) {
            return true;
        }

        return false;
    }


};