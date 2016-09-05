angular.module('gpss.common').filter('magazine', [function () {
    return input => {
        if (!input) {
            return;
        }
        if (angular.isNumber(input)) {
            input = input.toString();
        }
        return input.substring(4, 6) + '-' + input.substring(0, 4);
    };
}]);
