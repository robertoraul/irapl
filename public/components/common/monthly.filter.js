angular.module('gpss.common').filter('monthly', [function () {
    return input => {
        if (input === 1) {
            return input + ' mes';
        }
        if (input > 1) {
            return input + ' meses';
        }
        return '';
    };
}]);
