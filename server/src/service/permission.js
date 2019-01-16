module.exports = {

    /**
     * test action for permission
     * @param {number} requiredPermission
     * @param {number|undefined} [givenPermission=undefined]
     * @returns {boolean} returns true for permission
     */
    test: function (requiredPermission, givenPermission) {

        //TODO REMOVE WHEN USER LOGIN IS DONE
        if (typeof givenPermission === 'undefined') {
            return 3;
        }

        if (requiredPermission <= givenPermission) {
            return true;
        }
        return false;
    }


};