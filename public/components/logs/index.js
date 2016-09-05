angular.module('gpss.logs', ['gpss.core']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('logs', {
            abstract: true,
            url: '/logs',
            template: '<ui-view/>'
        })
        .state('logs.index', {
            url: '',
            template: '<logs/>'
        });
}]);
