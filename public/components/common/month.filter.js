angular.module('gpss.common').filter('month', ['$locale', function ($locale) {
    return input => $locale.DATETIME_FORMATS.STANDALONEMONTH[input - 1] || '';
}]);
