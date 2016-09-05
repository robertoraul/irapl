angular.module('lodash', []).factory('_', ['$window', function ($window) {
    if (angular.isUndefined($window._)) {
        throw new Error('angular-lodash\'s JavaScript requires lodash');
    }
    var _ = $window._.noConflict();
    _.mixin({
        /**
         * Looks for the words inside the fields.
         * @param {Array} fields Fields where I search the terms.
         * @param {String} terms Terms to lookup.
         * @returns {boolean} True if the terms match with the fields.
         */
        lookup: (fields, terms) => {
            if (!terms) {
                return true;
            }
            fields = _.map(fields, angular.lowercase);
            var words = _.words(angular.lowercase(terms));
            // every word should be include.
            return _.every(words,
                word => _.some(fields,
                    // some field should include the word.
                    field => _.includes(field, word)
                )
            );
        }
    }, {
        chain: false
    });
    return _;
}]);
