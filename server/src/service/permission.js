module.exports = {

    /**
     * test action for permission
     * @param {number} requiredPermission
     * @param {number|undefined} [givenPermission=undefined]
     * @returns {boolean} returns true for permission
     */
    test: function (requiredPermission, givenPermission) {

        if (typeof givenPermission === 'undefined') {
            return 3;
        }

        console.log(requiredPermission, givenPermission);

        if (requiredPermission <= givenPermission) {
            return true;
        }
        return false;
    }


};